import Link from 'next/link'
import { AvenueZLogo } from '@/components/layout/avenue-z-logo'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8">
      <AvenueZLogo height={28} className="text-white" />

      <h1 className="text-5xl font-extrabold uppercase text-white">
        Reporting{' '}
        <span className="gradient-text-full">Platform</span>
      </h1>

      <p className="max-w-md text-center text-text-muted">
        Multi-client marketing reporting powered by Supermetrics.
      </p>

      <div className="flex gap-4">
        <Link
          href="/login"
          className="rounded-[100px] bg-gradient-to-r from-brand-yellow via-brand-green to-brand-cyan px-7 py-3 text-sm font-extrabold uppercase tracking-wider text-black transition-opacity hover:opacity-90"
        >
          Sign In
        </Link>
        <Link
          href="/dashboard"
          className="rounded-[100px] bg-[#3a3a3a] px-7 py-3 text-sm font-bold tracking-wider text-white transition-colors hover:bg-bg-surface"
        >
          Dashboard
        </Link>
      </div>

      <div className="glow-bar mt-8 w-64" />
    </div>
  )
}
