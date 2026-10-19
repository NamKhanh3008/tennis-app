'use client'

import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Bell, Check, CheckCheck, CircleCheck, Clock3, MessageCircle, UserRound, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTennisApp } from '@/components/tennis-app-state'
import { currentUserId } from '@/lib/tennis-data'

export function NotificationsPage() {
  const router = useRouter()
  const { notifications, requests, markAllRead, resolveRequest, userById, posts } = useTennisApp()
  const sorted = useMemo(() => [...notifications].sort((a, b) => a.createdAt === 'Just now' ? -1 : b.createdAt === 'Just now' ? 1 : 0), [notifications])
  const unread = notifications.filter((item) => item.unread).length

  return <div className="mx-auto max-w-[820px]">
    <div className="mb-6 flex items-end justify-between gap-4">
      <div><p className="text-xs font-semibold uppercase tracking-[0.13em] text-[#62806b]">Stay in the loop</p><h1 className="mt-1 text-[28px] font-semibold tracking-[-0.04em]">Notifications</h1><p className="mt-1 text-sm text-[#77827a]">Match requests and updates from your tennis community.</p></div>
      <Button variant="outline" onClick={markAllRead} disabled={!unread} className="h-9 shrink-0 rounded-lg px-3 text-xs"><CheckCheck data-icon="inline-start" />Mark all read</Button>
    </div>
    {sorted.length ? <div className="overflow-hidden rounded-2xl border border-[#e5e9e6] bg-white">{sorted.map((item) => {
      const person = userById(item.userId)
      const request = item.requestId ? requests.find((entry) => entry.id === item.requestId) : undefined
      const post = item.postId ? posts.find((entry) => entry.id === item.postId) : undefined
      const actionable = item.type === 'interest' && request?.status === 'Pending'
      const outgoing = request?.fromUserId === currentUserId
      const icon = item.type === 'interest' ? <UserRound className="size-4" /> : item.type === 'matched' || item.type === 'accepted' ? <CircleCheck className="size-4" /> : item.type === 'message' ? <MessageCircle className="size-4" /> : <Bell className="size-4" />
      const profileId = request ? outgoing ? request.toUserId : request.fromUserId : item.userId
      return <article key={item.id} className={`flex gap-3.5 border-b border-[#edf0ed] p-4 last:border-0 sm:p-5 ${item.unread ? 'bg-[#f7faf7]' : 'bg-white'}`}>
        <div className="relative shrink-0"><img src={person.avatar} alt="" className="size-11 rounded-full object-cover" /><span className="absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full border-2 border-white bg-[#eaf2e9] text-[#54765b]">{icon}</span></div>
        <div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-2"><p className="text-sm leading-5 text-[#36433a]">{item.message}</p>{item.unread && <span className="mt-1 size-2 shrink-0 rounded-full bg-[#166534]" aria-label="Unread" />}</div>
          <p className="mt-1.5 flex items-center gap-1 text-[11px] text-[#929c94]"><Clock3 className="size-3" />{item.createdAt}{post ? ` · ${post.matchType}` : ''}{outgoing && request ? ' · Waiting for response' : ''}</p>
          {actionable && <div className="mt-3 flex flex-wrap items-center gap-2"><Button size="sm" onClick={() => resolveRequest(request.id, 'Accepted')} className="h-8 rounded-lg bg-[#166534] px-3 text-xs text-white hover:bg-[#11532a]"><Check data-icon="inline-start" />{outgoing ? 'Simulate acceptance' : 'Accept'}</Button><Button size="sm" variant="outline" onClick={() => resolveRequest(request.id, 'Declined')} className="h-8 rounded-lg px-3 text-xs"><X data-icon="inline-start" />{outgoing ? 'Simulate decline' : 'Decline'}</Button><button onClick={() => router.push(`/users/${profileId}`)} className="px-2 py-1 text-xs font-semibold text-[#166534]">View profile</button></div>}
        </div>
      </article>
    })}</div> : <div className="rounded-2xl border border-dashed border-[#dce4dc] bg-white px-6 py-14 text-center"><span className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#edf5ed] text-[#62806b]"><Bell className="size-5" /></span><h2 className="mt-4 text-sm font-semibold text-[#39483d]">You&apos;re all caught up</h2><p className="mt-1 text-sm text-[#859087]">New match requests and updates will show up here.</p></div>}
  </div>
}
