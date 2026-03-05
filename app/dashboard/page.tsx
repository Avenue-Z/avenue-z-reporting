import Link from 'next/link'
import { getAllClients } from '@/lib/clients.config'
import { Header } from '@/components/layout/header'

export default function DashboardPage() {
  const clients = getAllClients()

  return (
    <>
      <Header title="Clients" subtitle="Avenue Z" />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {clients.map((client) => (
          <Link
            key={client.slug}
            href={`/dashboard/${client.slug}/reports`}
            className="group relative overflow-hidden rounded-lg border border-white/[0.06] bg-bg-surface p-6 transition-colors hover:border-white/[0.12]"
          >
            {/* Gradient top accent */}
            <div className="absolute left-0 right-0 top-0 h-0.5 bg-gradient-to-r from-brand-yellow via-brand-green to-brand-cyan opacity-0 transition-opacity group-hover:opacity-100" />

            <h3 className="text-lg font-bold text-white">{client.name}</h3>
          </Link>
        ))}
      </div>
    </>
  )
}
