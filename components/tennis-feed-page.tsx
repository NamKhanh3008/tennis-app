'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CalendarDays, Clock3, MapPin, Plus, SlidersHorizontal, UsersRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTennisApp } from '@/components/tennis-app-state'
import { currentUserId, type TennisPost } from '@/lib/tennis-data'

function formatDate(date: string) { return new Date(`${date}T12:00:00`).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) }

function MatchPost({ post, onProfile }: { post: TennisPost; onProfile: (userId: string) => void }) {
  const { userById, requestForPost, expressInterest } = useTennisApp()
  const author = userById(post.userId)
  const request = requestForPost(post.id)
  const isMine = post.userId === currentUserId
  const isRequested = request?.status === 'Pending'
  const isAccepted = request?.status === 'Accepted'
  return <article className="rounded-2xl border border-[#e5e9e6] bg-white p-5 shadow-[0_2px_8px_rgba(24,35,29,0.025)] sm:p-6">
    <div className="flex items-start gap-3.5"><button onClick={() => onProfile(author.id)} className="shrink-0 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#166534]" aria-label={`View ${author.name}'s profile`}><img src={author.avatar} alt="" className="size-11 rounded-full object-cover" /></button><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-x-2 gap-y-1"><button onClick={() => onProfile(author.id)} className="text-sm font-semibold text-[#1b2920] hover:text-[#166534]">{author.name}</button><span className="rounded-full bg-[#eef5ee] px-2 py-0.5 text-[10px] font-semibold text-[#47704e]">{author.skill}</span><span className="text-[11px] text-[#9aa39c]">· {post.createdAt}</span></div><p className="mt-1 text-xs text-[#859087]">{author.major} · {author.year}</p></div><span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${post.status === 'Open' ? 'bg-[#eef7e9] text-[#46713d]' : post.status === 'Matched' ? 'bg-[#eaf1fa] text-[#496e9b]' : 'bg-[#f1f2f1] text-[#748078]'}`}>{post.status}</span></div>
    <p className="mt-4 text-[14px] leading-[1.65] text-[#344138]">{post.description}</p>
    <div className="mt-4 rounded-xl bg-[#f7f9f7] px-4 py-3.5"><div className="mb-3 flex items-center gap-2"><span className="rounded-md bg-white px-2.5 py-1 text-[11px] font-semibold text-[#4e6655] ring-1 ring-[#e5eae5]">{post.matchType}</span><span className="text-[11px] text-[#89948c]">Looking for {post.partnerSkill.toLowerCase()}</span></div><div className="grid gap-2 text-xs text-[#657168] sm:grid-cols-2"><span className="flex items-center gap-2"><CalendarDays className="size-3.5 text-[#65816b]" />{formatDate(post.date)}</span><span className="flex items-center gap-2"><Clock3 className="size-3.5 text-[#65816b]" />{post.time}</span><span className="flex items-center gap-2 sm:col-span-2"><MapPin className="size-3.5 text-[#65816b]" />{post.location}</span></div></div>
    {post.notes && <p className="mt-3 text-xs text-[#7e8981]"><span className="font-semibold text-[#69766d]">Note:</span> {post.notes}</p>}
    <div className="mt-4 flex items-center gap-2 border-t border-[#edf0ed] pt-4"><Button variant={isRequested || isAccepted || isMine ? 'outline' : 'default'} disabled={isRequested || isAccepted || isMine || post.status !== 'Open'} onClick={() => expressInterest(post)} className={`h-9 flex-1 rounded-lg ${isRequested || isAccepted || isMine ? 'text-[#69766d]' : 'bg-[#166534] text-white hover:bg-[#11532a]'}`}>{isMine ? <><UsersRound data-icon="inline-start" />Your post</> : isAccepted ? 'Matched' : isRequested ? 'Requested' : 'Interested'}</Button><Button variant="outline" onClick={() => onProfile(author.id)} className="h-9 rounded-lg px-4 text-xs font-semibold">View profile</Button></div>
  </article>
}

export function FeedPage({ onCreate }: { onCreate: () => void }) {
  const router = useRouter()
  const { posts, profile, userById } = useTennisApp()
  const [matchType, setMatchType] = useState('All match types')
  const [skill, setSkill] = useState('All levels')
  const [dateRange, setDateRange] = useState('Any date')
  const [availability, setAvailability] = useState('Any availability')
  const visiblePosts = useMemo(() => posts.filter((post) => {
    if (post.status !== 'Open') return false
    if (matchType !== 'All match types' && post.matchType !== matchType) return false
    if (skill !== 'All levels' && !post.partnerSkill.toLowerCase().includes(skill.toLowerCase())) return false
    const day = new Date(`${post.date}T12:00:00`).getDay()
    const [rawHour] = post.time.split(':')
    const hour = Number(rawHour) + (post.time.includes('PM') && rawHour !== '12' ? 12 : 0)
    if (dateRange === 'This week' && (post.date < '2026-10-19' || post.date > '2026-10-25')) return false
    if (dateRange === 'This weekend' && (post.date < '2026-10-24' || post.date > '2026-10-25')) return false
    if (availability === 'Evening' && hour < 16) return false
    if (availability === 'Morning' && hour >= 12) return false
    if (availability === 'Afternoon' && (hour < 12 || hour >= 16)) return false
    return true
  }), [posts, matchType, skill, dateRange, availability])
  const suggested = ['u4', 'u6', 'u7'].map((id) => userById(id))
  return <div className="mx-auto max-w-[1120px]">
    <div className="mb-6 flex items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.13em] text-[#62806b]">Monday, October 19</p><h1 className="mt-1 text-[27px] font-semibold tracking-[-0.045em] text-[#18231d] sm:text-[30px]">Find your next match</h1><p className="mt-1 text-sm text-[#77827a]">Your campus tennis community is ready to play.</p></div><Button onClick={onCreate} className="hidden h-10 shrink-0 rounded-lg bg-[#166534] px-4 text-white hover:bg-[#11532a] sm:flex"><Plus data-icon="inline-start" />Create post</Button></div>
    <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_270px]">
      <div className="flex min-w-0 flex-col gap-4"><div className="rounded-2xl border border-[#e5e9e6] bg-white p-4"><div className="mb-3 flex items-center gap-2 text-xs font-semibold text-[#526057]"><SlidersHorizontal className="size-4 text-[#66816d]" />Find the right game</div><div className="grid grid-cols-2 gap-2 sm:grid-cols-4"><select aria-label="Filter by match type" value={matchType} onChange={(e) => setMatchType(e.target.value)} className="h-9 min-w-0 rounded-lg border border-[#e5e9e6] bg-white px-2.5 text-xs text-[#536057] outline-none focus:border-[#166534]"><option>All match types</option>{['Casual Rally', 'Singles Match', 'Doubles', 'Practice'].map((item) => <option key={item}>{item}</option>)}</select><select aria-label="Filter by skill level" value={skill} onChange={(e) => setSkill(e.target.value)} className="h-9 min-w-0 rounded-lg border border-[#e5e9e6] bg-white px-2.5 text-xs text-[#536057] outline-none focus:border-[#166534]"><option>All levels</option>{['Beginner', 'Intermediate', 'Advanced', 'Competitive'].map((item) => <option key={item}>{item}</option>)}</select><select aria-label="Filter by date" value={dateRange} onChange={(e) => setDateRange(e.target.value)} className="h-9 min-w-0 rounded-lg border border-[#e5e9e6] bg-white px-2.5 text-xs text-[#536057] outline-none focus:border-[#166534]"><option>Any date</option><option>This week</option><option>This weekend</option></select><select aria-label="Filter by availability" value={availability} onChange={(e) => setAvailability(e.target.value)} className="h-9 min-w-0 rounded-lg border border-[#e5e9e6] bg-white px-2.5 text-xs text-[#536057] outline-none focus:border-[#166534]"><option>Any availability</option><option>Morning</option><option>Afternoon</option><option>Evening</option></select></div></div>
        <div className="flex items-center justify-between px-1"><h2 className="text-sm font-semibold text-[#26352a]">Suggested for you</h2><span className="text-xs text-[#929d94]">{visiblePosts.length} open requests</span></div>
        {visiblePosts.length ? visiblePosts.map((post) => <MatchPost key={post.id} post={post} onProfile={(id) => router.push(`/users/${id}`)} />) : <div className="rounded-2xl border border-dashed border-[#dce4dc] bg-white px-6 py-12 text-center"><p className="font-semibold text-[#39483d]">No matches for those filters</p><p className="mt-1 text-sm text-[#859087]">Try adjusting your filters to see more players.</p><button className="mt-4 text-sm font-semibold text-[#166534]" onClick={() => { setMatchType('All match types'); setSkill('All levels'); setDateRange('Any date'); setAvailability('Any availability') }}>Clear filters</button></div>}
      </div>
      <aside className="hidden flex-col gap-4 xl:flex"><section className="rounded-2xl border border-[#e5e9e6] bg-white p-4"><div className="mb-4 flex items-center justify-between"><h2 className="text-sm font-semibold">Your profile</h2><button onClick={() => router.push('/profile')} className="text-xs font-semibold text-[#166534]">Edit</button></div><div className="flex items-center gap-3"><img src={profile.avatar} alt="" className="size-11 rounded-full object-cover" /><div><p className="text-sm font-semibold">{profile.name}</p><p className="mt-0.5 text-xs text-[#7c887f]">{profile.skill} · CMU</p></div></div><p className="mt-3 line-clamp-2 text-xs leading-5 text-[#77827a]">{profile.bio}</p></section><section className="rounded-2xl border border-[#e5e9e6] bg-white p-4"><div className="mb-4 flex items-center justify-between"><h2 className="text-sm font-semibold">Players to know</h2><span className="text-[10px] text-[#9aa39c]">CMU community</span></div><div className="flex flex-col gap-3.5">{suggested.map((player) => <button key={player.id} onClick={() => router.push(`/users/${player.id}`)} className="flex items-center gap-2.5 text-left"><img src={player.avatar} alt="" className="size-9 rounded-full object-cover" /><span className="min-w-0 flex-1"><span className="block truncate text-xs font-semibold text-[#27342b]">{player.name}</span><span className="mt-0.5 block truncate text-[10px] text-[#839087]">{player.skill} · {player.style}</span></span><span className="text-xs text-[#6b8a70]">View</span></button>)}</div><Button variant="outline" onClick={() => router.push('/profile')} className="mt-4 h-9 w-full rounded-lg text-xs">See your profile</Button></section><div className="rounded-2xl bg-[#eaf2e9] p-4"><p className="text-sm font-semibold text-[#244e2c]">Good games start here.</p><p className="mt-1 text-xs leading-5 text-[#5d765f]">Share when you&apos;re free and find a partner who fits your game.</p><button onClick={onCreate} className="mt-3 flex items-center gap-1.5 text-xs font-bold text-[#166534]"><Plus className="size-3.5" />Post a match request</button></div></aside>
    </div>
  </div>
}
