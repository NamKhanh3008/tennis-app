'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Bell, CircleDot, Home, LogOut, Menu, MessageCircle, Plus, Search, UserRound, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTennisApp } from '@/components/tennis-app-state'
import { FeedPage } from '@/components/tennis-feed-page'
import { InboxPage } from '@/components/tennis-community-pages'
import { NotificationsPage } from '@/components/tennis-notifications-page'
import { ProfilePage } from '@/components/tennis-profile-page'
import { CreatePostDialog } from '@/components/tennis-create-post'
import { currentUserId } from '@/lib/tennis-data'

const navigation = [
  { label: 'Feed', path: '/feed', icon: Home },
  { label: 'Notifications', path: '/notifications', icon: Bell },
  { label: 'Inbox', path: '/inbox', icon: MessageCircle },
  { label: 'My profile', path: '/profile', icon: UserRound },
]

export function TennisApp() {
  const pathname = usePathname()
  const router = useRouter()
  const { profile, notifications } = useTennisApp()
  const [createOpen, setCreateOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const currentSection = pathname === '/profile' ? 'My profile' : pathname === '/notifications' ? 'Notifications' : pathname === '/inbox' ? 'Inbox' : pathname.startsWith('/users/') ? 'Profile' : 'Feed'
  const unreadCount = notifications.filter((item) => item.unread).length
  const navigate = (path: string) => {
    setMobileMenuOpen(false)
    router.push(path)
  }

  const content = pathname === '/notifications'
    ? <NotificationsPage />
    : pathname === '/inbox'
      ? <InboxPage />
      : pathname === '/profile'
        ? <ProfilePage userId={currentUserId} isOwner />
        : pathname.startsWith('/users/')
          ? <ProfilePage userId={pathname.split('/').pop() ?? currentUserId} />
          : <FeedPage onCreate={() => setCreateOpen(true)} />

  return (
    <div className="min-h-screen bg-[#f5f7f5] text-[#18231d]">
      <header className="sticky top-0 z-30 border-b border-[#e5e9e6] bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[68px] max-w-[1440px] items-center gap-6 px-4 sm:px-6">
          <button className="flex shrink-0 items-center gap-2.5 text-left" onClick={() => navigate('/feed')} aria-label="CMU Tennis home">
            <span className="flex size-9 items-center justify-center rounded-xl bg-[#166534] text-[#d9f367]"><CircleDot className="size-5" /></span>
            <span className="hidden text-[17px] font-bold tracking-[-0.04em] sm:inline">cmu<span className="text-[#166534]">tennis</span></span>
          </button>
          <div className="hidden max-w-[390px] flex-1 md:block">
            <label className="flex h-10 items-center gap-2.5 rounded-full bg-[#f3f5f3] px-4 text-[#728077]">
              <Search className="size-4" /><span className="text-sm">Search players, posts, and courts</span>
            </label>
          </div>
          <nav aria-label="Main navigation" className="ml-auto hidden h-full items-center gap-1 lg:flex">
            {navigation.map(({ label, path, icon: Icon }) => (
              <button key={path} onClick={() => navigate(path)} className={`relative flex h-full min-w-[88px] flex-col items-center justify-center gap-1 px-3 text-xs font-medium transition-colors ${currentSection === label ? 'text-[#166534]' : 'text-[#758078] hover:text-[#18231d]'}`}>
                <span className="relative"><Icon className="size-[19px]" />{label === 'Notifications' && unreadCount > 0 && <span className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-[#166534] text-[9px] text-white">{unreadCount}</span>}</span>
                {label}<span className={`absolute bottom-0 h-[3px] w-12 rounded-t-full ${currentSection === label ? 'bg-[#166534]' : 'bg-transparent'}`} />
              </button>
            ))}
          </nav>
          <div className="ml-auto hidden items-center gap-2 border-l border-[#e9ece9] pl-5 lg:flex">
            <button onClick={() => navigate('/profile')} className="flex items-center gap-2.5 rounded-full p-1.5 pr-3 hover:bg-[#f5f7f5]">
              <img src={profile.avatar} alt="" className="size-8 rounded-full object-cover" />
              <span className="max-w-28 truncate text-sm font-semibold">{profile.name}</span>
            </button>
            <Button variant="ghost" size="icon" aria-label="Sign out" onClick={() => navigate('/login')}><LogOut /></Button>
          </div>
          <div className="ml-auto flex items-center gap-2 lg:hidden">
            <button onClick={() => navigate('/profile')} className="rounded-full" aria-label="Open my profile"><img src={profile.avatar} alt="" className="size-8 rounded-full object-cover" /></button>
            <Button variant="ghost" size="icon" aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMobileMenuOpen((open) => !open)}>{mobileMenuOpen ? <X /> : <Menu />}</Button>
          </div>
        </div>
        {mobileMenuOpen && <div className="border-t border-[#e5e9e6] bg-white p-3 lg:hidden">
          <div className="grid grid-cols-2 gap-2">{navigation.map(({ label, path, icon: Icon }) => <button key={path} onClick={() => navigate(path)} className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium ${currentSection === label ? 'bg-[#edf5ed] text-[#166534]' : 'text-[#59665d]'}`}><Icon className="size-4" />{label}</button>)}</div>
        </div>}
      </header>

      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-8 px-4 pb-24 sm:px-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:px-8">
        <aside className="sticky top-[68px] hidden h-[calc(100vh-68px)] flex-col py-7 lg:flex">
          <div className="flex flex-col gap-1">
            {navigation.map(({ label, path, icon: Icon }) => <button key={path} onClick={() => navigate(path)} className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-left text-sm font-semibold transition-colors ${currentSection === label ? 'bg-[#eaf3ea] text-[#166534]' : 'text-[#5e6a62] hover:bg-white hover:text-[#18231d]'}`}><Icon className="size-[18px]" />{label}{label === 'Notifications' && unreadCount > 0 && <span className="ml-auto flex size-5 items-center justify-center rounded-full bg-[#166534] text-[10px] text-white">{unreadCount}</span>}</button>)}
          </div>
          <Button onClick={() => setCreateOpen(true)} className="mt-6 h-11 w-full justify-center rounded-xl bg-[#166534] text-white hover:bg-[#11532a]"><Plus data-icon="inline-start" />Create a post</Button>
          <div className="mt-auto rounded-2xl border border-[#e4e9e4] bg-white p-4">
            <div className="flex items-center gap-3"><img src={profile.avatar} alt="" className="size-10 rounded-full object-cover" /><div className="min-w-0"><p className="truncate text-sm font-semibold">{profile.name}</p><p className="text-xs text-[#748078]">{profile.skill} player</p></div></div>
            <button className="mt-4 w-full rounded-lg border border-[#e5e9e5] py-2 text-xs font-semibold text-[#526157] hover:bg-[#f7f9f7]" onClick={() => navigate('/profile')}>View your profile</button>
          </div>
          <p className="mt-5 px-2 text-[11px] text-[#9aa39c]">A better match starts on court.</p>
        </aside>
        <main className="min-w-0 py-6 lg:py-8">{content}</main>
      </div>

      <nav aria-label="Mobile navigation" className="fixed inset-x-0 bottom-0 z-30 flex border-t border-[#e5e9e6] bg-white px-2 pb-[env(safe-area-inset-bottom)] pt-1 lg:hidden">
        {navigation.slice(0, 2).map(({ label, path, icon: Icon }) => <button key={path} onClick={() => navigate(path)} className={`flex flex-1 flex-col items-center gap-1 py-2 text-[10px] font-medium ${currentSection === label ? 'text-[#166534]' : 'text-[#7a857d]'}`}><Icon className="size-5" />{label}</button>)}
        <button onClick={() => setCreateOpen(true)} className="flex flex-1 flex-col items-center gap-1 py-2 text-[10px] font-semibold text-[#166534]"><span className="flex size-7 items-center justify-center rounded-lg bg-[#166534] text-white"><Plus className="size-4" /></span>Create</button>
        {navigation.slice(2).map(({ label, path, icon: Icon }) => <button key={path} onClick={() => navigate(path)} className={`flex flex-1 flex-col items-center gap-1 py-2 text-[10px] font-medium ${currentSection === label ? 'text-[#166534]' : 'text-[#7a857d]'}`}><Icon className="size-5" />{label === 'My profile' ? 'Profile' : label}</button>)}
      </nav>
      <CreatePostDialog open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  )
}
