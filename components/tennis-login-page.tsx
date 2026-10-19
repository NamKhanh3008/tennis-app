'use client'

import { useRouter } from 'next/navigation'
import { ArrowRight, CircleDot, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function TennisLoginPage() {
  const router = useRouter()
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f5f7f5] px-5 py-12">
      <div className="absolute -right-28 -top-32 size-[420px] rounded-full border border-[#e2e9e2]" />
      <div className="absolute -bottom-44 -left-28 size-[520px] rounded-full border border-[#e2e9e2]" />
      <section className="relative w-full max-w-[430px] rounded-[24px] border border-[#e5eae5] bg-white px-7 py-9 shadow-[0_18px_60px_rgba(24,35,29,0.06)] sm:px-10 sm:py-11">
        <div className="mb-9 flex items-center gap-2.5"><span className="flex size-10 items-center justify-center rounded-xl bg-[#166534] text-[#d9f367]"><CircleDot className="size-5" /></span><span className="text-[17px] font-bold tracking-[-0.04em]">cmu<span className="text-[#166534]">tennis</span></span></div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.13em] text-[#62806b]">Your campus, your court</p>
        <h1 className="max-w-[340px] text-[32px] leading-[1.15] font-semibold tracking-[-0.045em] text-[#18231d]">Find your next tennis partner</h1>
        <p className="mt-3 max-w-[330px] text-[15px] leading-6 text-[#77827a]">Connect with tennis players across Carnegie Mellon.</p>
        <Button onClick={() => router.push('/feed')} className="mt-8 h-12 w-full justify-center gap-3 rounded-xl bg-[#166534] text-[14px] font-semibold text-white hover:bg-[#11532a]">
          <span className="flex size-6 items-center justify-center rounded-full bg-white text-[#4285f4]"><span className="text-[14px] font-bold">G</span></span>Continue with Google<ArrowRight data-icon="inline-end" />
        </Button>
        <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-[#879189]"><ShieldCheck className="size-3.5 text-[#62806b]" />Sign in with your CMU Google account.</div>
        <div className="my-8 h-px bg-[#edf0ed]" />
        <div className="flex items-center justify-between text-xs text-[#9aa39c]"><span>Made for the CMU tennis community</span><span>CMU · Pittsburgh</span></div>
      </section>
      <p className="absolute bottom-5 text-[11px] text-[#9aa39c]">By continuing, you agree to be a good sport.</p>
    </main>
  )
}
