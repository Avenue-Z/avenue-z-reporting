'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { signOutAction } from '@/app/actions/auth'
import { REPORT_NAMES } from '@/lib/constants'
import { getAllClients } from '@/lib/clients.config'
import {
  LayoutGrid,
  FileText,
  Link2,
  LogOut,
  ChevronLeft,
} from 'lucide-react'
import { AvenueZLogo } from './avenue-z-logo'

export function Sidebar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const pathParts = pathname.split('/')
  const clientSlug =
    pathParts[1] === 'dashboard' && pathParts.length >= 3 && pathParts[2] !== ''
      ? pathParts[2]
      : null

  const isTopLevel = !clientSlug || ['reports', 'connections', 'settings'].includes(clientSlug)

  if (!isTopLevel && clientSlug) {
    return <ClientSidebar clientSlug={clientSlug} pathname={pathname} activeSection={searchParams.get('section')} dateRange={searchParams.get('dateRange')} />
  }

  return <MainSidebar pathname={pathname} />
}

function MainSidebar({ pathname }: { pathname: string }) {
  const clients = getAllClients()

  return (
    <aside className="sticky top-0 flex h-screen w-60 flex-col border-r border-white/[0.06] bg-bg-surface">
      <div className="px-6 pt-8">
        <Logo />
        <div className="divider-full mb-4" />
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 pb-4">
        <SidebarLink
          href="/dashboard"
          icon={LayoutGrid}
          label="All Clients"
          isActive={pathname === '/dashboard'}
        />
        <SidebarLink
          href="/dashboard/connections"
          icon={Link2}
          label="Connections"
          isActive={pathname === '/dashboard/connections'}
        />

        <p className="mb-1 mt-5 px-4 text-[11px] font-extrabold uppercase tracking-widest text-text-muted">
          Clients
        </p>
        {clients.map((client) => (
          <SidebarLink
            key={client.slug}
            href={`/dashboard/${client.slug}/reports`}
            icon={FileText}
            label={client.name}
            isActive={pathname.startsWith(`/dashboard/${client.slug}`)}
          />
        ))}
      </nav>

      <div className="border-t border-white/[0.06] px-6 py-4">
        <SignOutButton />
      </div>
    </aside>
  )
}

function ClientSidebar({
  clientSlug,
  pathname,
  activeSection,
  dateRange,
}: {
  clientSlug: string
  pathname: string
  activeSection: string | null
  dateRange: string | null
}) {
  const clients = getAllClients()
  const client = clients.find((c) => c.slug === clientSlug)
  const clientName = client?.name ?? clientSlug
  const isOnReports = pathname === `/dashboard/${clientSlug}/reports`

  return (
    <aside className="sticky top-0 flex h-screen w-60 flex-col border-r border-white/[0.06] bg-bg-surface">
      <div className="px-6 pt-8">
        <Logo />
        <div className="divider-full mb-4" />
      </div>

      <nav className="flex flex-1 flex-col overflow-y-auto px-6 pb-4">
        {/* Back link */}
        <Link
          href="/dashboard"
          className="mb-5 flex items-center gap-2 text-xs font-bold text-text-muted transition-colors hover:text-white"
        >
          <ChevronLeft className="h-3 w-3" />
          All Clients
        </Link>

        {/* Client name */}
        <div className="mb-4 px-1">
          <p className="text-[11px] font-extrabold uppercase tracking-widest text-text-muted">
            Client
          </p>
          <p className="mt-0.5 text-base font-extrabold text-white">{clientName}</p>
        </div>

        <div className="divider-full mb-4" />

        {/* Report section tabs */}
        {client && (
          <div className="flex flex-col gap-0.5">
            <p className="mb-2 px-1 text-[11px] font-extrabold uppercase tracking-widest text-text-muted">
              Report Sections
            </p>
            {client.enabledReports.map((slug) => {
              const isActive = isOnReports && (activeSection === slug || (!activeSection && slug === client.enabledReports[0]))
              const linkParams = new URLSearchParams()
              linkParams.set('section', slug)
              if (dateRange) linkParams.set('dateRange', dateRange)
              return (
                <Link
                  key={slug}
                  href={`/dashboard/${clientSlug}/reports?${linkParams.toString()}`}
                  className={cn(
                    'rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors',
                    isActive
                      ? 'bg-white/[0.1] font-bold text-white'
                      : 'text-text-muted hover:bg-white/[0.06] hover:text-white'
                  )}
                >
                  {REPORT_NAMES[slug] ?? slug}
                </Link>
              )
            })}
          </div>
        )}
      </nav>

      <div className="border-t border-white/[0.06] px-6 py-4">
        <SignOutButton />
      </div>
    </aside>
  )
}

function Logo() {
  return (
    <Link href="/dashboard" className="mb-6 block text-white">
      <AvenueZLogo height={22} />
    </Link>
  )
}

function SidebarLink({
  href,
  icon: Icon,
  label,
  isActive,
}: {
  href: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  isActive: boolean
}) {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 rounded-[100px] px-4 py-2.5 text-sm font-bold transition-colors',
        isActive
          ? 'bg-white text-black'
          : 'text-text-muted hover:bg-bg-subtle hover:text-white'
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  )
}

function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button
        type="submit"
        className="flex w-full items-center gap-3 rounded-[100px] px-4 py-2.5 text-sm font-bold text-text-muted transition-colors hover:bg-bg-subtle hover:text-white"
      >
        <LogOut className="h-4 w-4" />
        Sign Out
      </button>
    </form>
  )
}
