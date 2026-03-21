import { Suspense } from 'react'
import { PortalSidebar } from '@/components/layout/portal-sidebar'

export default function PortalLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ clientSlug: string }>
}) {
  return (
    <div className="flex h-screen bg-black" data-print-layout>
      <Suspense>
        <PortalSidebar />
      </Suspense>
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl px-8 py-8">{children}</div>
      </main>
    </div>
  )
}
