'use client'

import { useState } from 'react'
import { CalendarDays, MapPin, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTennisApp } from '@/components/tennis-app-state'
import type { MatchType } from '@/lib/tennis-data'

const inputStyle = 'mt-1.5 h-11 w-full rounded-lg border border-[#dfe5df] bg-white px-3.5 text-sm text-[#253128] outline-none transition focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10'

export function CreatePostDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { publishPost } = useTennisApp()
  const [description, setDescription] = useState('')
  const [matchType, setMatchType] = useState<MatchType>('Casual Rally')
  const [date, setDate] = useState('2026-10-23')
  const [time, setTime] = useState('17:00')
  const [location, setLocation] = useState('CMU Tennis Courts')
  const [partnerSkill, setPartnerSkill] = useState('Beginner to Intermediate')
  const [notes, setNotes] = useState('')
  if (!open) return null
  const close = () => onOpenChange(false)
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!description.trim() || !date || !time || !location.trim()) return
    publishPost({ description: description.trim(), matchType, date, time: new Date(`2026-01-01T${time}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }), location: location.trim(), partnerSkill, notes: notes.trim() || undefined })
    setDescription('')
    setNotes('')
    close()
  }
  const label = 'text-xs font-semibold text-[#526057]'
  return <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#122018]/45 sm:items-center sm:p-5" onMouseDown={(event) => { if (event.target === event.currentTarget) close() }}>
    <section role="dialog" aria-modal="true" aria-labelledby="create-post-title" className="max-h-[95dvh] w-full overflow-y-auto rounded-t-[24px] bg-white p-5 shadow-2xl sm:max-w-[600px] sm:rounded-[20px] sm:p-7">
      <div className="mb-5 flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#62806b]">Your next match</p><h2 id="create-post-title" className="mt-1 text-xl font-semibold tracking-[-0.03em]">Create a tennis post</h2><p className="mt-1 text-sm text-[#758078]">Let the CMU tennis community know when you&apos;re playing.</p></div><Button variant="ghost" size="icon" aria-label="Close" onClick={close}><X /></Button></div>
      <form onSubmit={submit} className="flex flex-col gap-4">
        <label className={label}>What are you looking for?<textarea required rows={3} maxLength={280} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Looking for someone to rally with this Friday!" className="mt-1.5 w-full resize-y rounded-lg border border-[#dfe5df] px-3.5 py-3 text-sm leading-6 outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10" /></label>
        <div className="grid gap-4 sm:grid-cols-2"><label className={label}>Match type<select value={matchType} onChange={(e) => setMatchType(e.target.value as MatchType)} className={inputStyle}>{['Casual Rally', 'Singles Match', 'Doubles', 'Practice'].map((item) => <option key={item}>{item}</option>)}</select></label><label className={label}>Preferred partner level<select value={partnerSkill} onChange={(e) => setPartnerSkill(e.target.value)} className={inputStyle}>{['Any level', 'Beginner', 'Beginner to Intermediate', 'Intermediate', 'Intermediate to Advanced', 'Advanced to Competitive', 'Competitive'].map((item) => <option key={item}>{item}</option>)}</select></label></div>
        <div className="grid gap-4 sm:grid-cols-2"><label className={label}>Preferred date<span className="relative block"><CalendarDays className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#869188]" /><input required type="date" min="2026-10-19" value={date} onChange={(e) => setDate(e.target.value)} className={`${inputStyle} pl-10`} /></span></label><label className={label}>Start time<input required type="time" value={time} onChange={(e) => setTime(e.target.value)} className={inputStyle} /></label></div>
        <label className={label}>Court / location<span className="relative block"><MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#869188]" /><input required maxLength={100} value={location} onChange={(e) => setLocation(e.target.value)} placeholder="CMU Tennis Courts" className={`${inputStyle} pl-10`} /></span></label>
        <label className={label}>Additional notes <span className="font-normal text-[#9aa39c]">(optional)</span><textarea rows={2} maxLength={240} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Anything else your partner should know?" className="mt-1.5 w-full rounded-lg border border-[#dfe5df] px-3.5 py-3 text-sm outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10" /></label>
        <div className="mt-1 flex flex-col-reverse gap-2 border-t border-[#edf0ed] pt-4 sm:flex-row sm:justify-end"><Button type="button" variant="outline" onClick={close} className="h-10 rounded-lg px-5">Cancel</Button><Button type="submit" className="h-10 rounded-lg bg-[#166534] px-5 text-white hover:bg-[#11532a]">Publish post</Button></div>
      </form>
    </section>
  </div>
}
