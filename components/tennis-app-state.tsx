'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { Toaster, toast } from 'sonner'
import { createInterestRequest, createPost as addPost, resolveInterest } from '@/lib/mock-services'
import { currentUserId, initialConversations, initialNotifications, initialPosts, initialRequests, users, type Conversation, type MatchRequest, type TennisMessage, type TennisNotification, type TennisPost, type TennisUser } from '@/lib/tennis-data'

type AppStateValue = {
  posts: TennisPost[]
  requests: MatchRequest[]
  notifications: TennisNotification[]
  conversations: Conversation[]
  profile: TennisUser
  userById: (id: string) => TennisUser
  requestForPost: (postId: string) => MatchRequest | undefined
  pendingForPost: (postId: string) => MatchRequest[]
  publishPost: (post: Omit<TennisPost, 'id' | 'userId' | 'createdAt' | 'status'>) => void
  expressInterest: (post: TennisPost) => void
  resolveRequest: (requestId: string, status: 'Accepted' | 'Declined') => void
  cancelPost: (postId: string) => void
  updatePost: (postId: string, changes: Partial<TennisPost>) => void
  sendMessage: (conversationId: string, text: string) => void
  markAllRead: () => void
  updateProfile: (changes: Partial<TennisUser>) => void
  setVideo: (url?: string) => void
}

const AppStateContext = createContext<AppStateValue | null>(null)

export function TennisAppState({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState(initialPosts)
  const [requests, setRequests] = useState(initialRequests)
  const [notifications, setNotifications] = useState(initialNotifications)
  const [conversations, setConversations] = useState(initialConversations)
  const [profile, setProfile] = useState(() => users.find((user) => user.id === currentUserId)!)

  const userById = useCallback((id: string) => id === currentUserId ? profile : users.find((user) => user.id === id) ?? profile, [profile])
  const requestForPost = useCallback((postId: string) => requests.find((request) => request.postId === postId && request.fromUserId === currentUserId), [requests])
  const pendingForPost = useCallback((postId: string) => requests.filter((request) => request.postId === postId && request.toUserId === currentUserId && request.status === 'Pending'), [requests])

  const publishPost = useCallback((values: Omit<TennisPost, 'id' | 'userId' | 'createdAt' | 'status'>) => {
    const post: TennisPost = { ...values, id: `p${Date.now()}`, userId: currentUserId, createdAt: 'Just now', status: 'Open' }
    setPosts((current) => addPost(post, current))
    toast.success('Your match request is live.')
  }, [])

  const expressInterest = useCallback((post: TennisPost) => {
    if (requests.some((request) => request.postId === post.id && request.fromUserId === currentUserId)) return
    const request: MatchRequest = { id: `r${Date.now()}`, postId: post.id, fromUserId: currentUserId, toUserId: post.userId, status: 'Pending', createdAt: 'Just now' }
    setRequests((current) => createInterestRequest(request, current))
    setNotifications((current) => [{ id: `n${Date.now()}`, type: 'interest', userId: post.userId, postId: post.id, requestId: request.id, message: `Your match request to ${userById(post.userId).name} is pending.`, createdAt: 'Just now', unread: true }, ...current])
    toast.success('Interest sent', { description: 'We’ll let you know when they respond.' })
  }, [requests, userById])

  const resolveRequest = useCallback((requestId: string, status: 'Accepted' | 'Declined') => {
    const target = requests.find((request) => request.id === requestId)
    if (!target || target.status !== 'Pending') return
    setRequests((current) => resolveInterest(current, requestId, status))
    const counterpartId = target.fromUserId === currentUserId ? target.toUserId : target.fromUserId
    const person = userById(counterpartId)
    const post = posts.find((item) => item.id === target.postId)
    setNotifications((current) => [{ id: `n${Date.now()}`, type: status === 'Accepted' ? 'matched' : 'declined', userId: counterpartId, postId: target.postId, requestId, message: status === 'Accepted' ? `You’re matched with ${person.name}. Say hello in your inbox.` : `Your request to ${person.name} was declined.`, createdAt: 'Just now', unread: true }, ...current])
    if (status === 'Accepted') {
      if (post) setPosts((current) => current.map((item) => item.id === post.id ? { ...item, status: 'Matched' } : item))
      setConversations((current) => current.some((conversation) => conversation.participantId === counterpartId) ? current : [{ id: `c${Date.now()}`, participantId: counterpartId, postId: target.postId, unread: 0, messages: [{ id: `m${Date.now()}`, fromUserId: counterpartId, text: `Hi! Thanks for matching. Are we still on for ${post?.date ?? 'the court'}?`, time: 'Just now' }] }, ...current])
      toast.success(`You’re matched with ${person.name}`, { description: 'Your conversation is ready in the inbox.' })
    } else {
      toast('Request declined')
    }
  }, [posts, requests, userById])

  const cancelPost = useCallback((postId: string) => {
    setPosts((current) => current.map((post) => post.id === postId ? { ...post, status: 'Cancelled' } : post))
    toast.success('Post cancelled')
  }, [])

  const updatePost = useCallback((postId: string, changes: Partial<TennisPost>) => {
    setPosts((current) => current.map((post) => post.id === postId ? { ...post, ...changes } : post))
    toast.success('Post updated')
  }, [])

  const sendMessage = useCallback((conversationId: string, text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    const message: TennisMessage = { id: `m${Date.now()}`, fromUserId: currentUserId, text: trimmed, time: new Intl.DateTimeFormat('en', { hour: 'numeric', minute: '2-digit' }).format(new Date()) }
    setConversations((current) => current.map((conversation) => conversation.id === conversationId ? { ...conversation, messages: [...conversation.messages, message], unread: 0 } : conversation))
  }, [])

  const markAllRead = useCallback(() => setNotifications((current) => current.map((notification) => ({ ...notification, unread: false }))), [])
  const updateProfile = useCallback((changes: Partial<TennisUser>) => setProfile((current) => ({ ...current, ...changes })), [])
  const setVideo = useCallback((url?: string) => setProfile((current) => ({ ...current, video: url })), [])

  const value = useMemo(() => ({ posts, requests, notifications, conversations, profile, userById, requestForPost, pendingForPost, publishPost, expressInterest, resolveRequest, cancelPost, updatePost, sendMessage, markAllRead, updateProfile, setVideo }), [posts, requests, notifications, conversations, profile, userById, requestForPost, pendingForPost, publishPost, expressInterest, resolveRequest, cancelPost, updatePost, sendMessage, markAllRead, updateProfile, setVideo])
  return <AppStateContext.Provider value={value}>{children}<Toaster position="top-center" richColors /></AppStateContext.Provider>
}

export function useTennisApp() {
  const context = useContext(AppStateContext)
  if (!context) throw new Error('useTennisApp must be used inside TennisAppState')
  return context
}
