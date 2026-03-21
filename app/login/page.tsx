import { AvenueZLogo } from '@/components/layout/avenue-z-logo'
import { demoLoginInternal, demoLoginClient } from '@/app/actions/demo-auth'
import { getAllClients } from '@/lib/clients.config'
import Image from 'next/image'

export default function LoginPage() {
  const clients = getAllClients()

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm rounded-lg border border-white/[0.06] bg-bg-surface p-8">
        <div className="mb-6 flex justify-center">
          <AvenueZLogo height={22} className="text-white" />
        </div>

        <h1 className="mb-2 text-center text-2xl font-extrabold text-white">
          Reporting Platform
        </h1>
        <p className="mb-8 text-center text-sm text-text-muted">
          Select your account to continue
        </p>

        {/* Internal — Avenue Z team */}
        <form action={demoLoginInternal}>
          <button
            type="submit"
            className="mb-3 flex w-full items-center gap-3 rounded-[100px] bg-white px-6 py-3 text-sm font-bold text-black transition-opacity hover:opacity-90"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black text-[10px] font-extrabold text-white">
              AZ
            </span>
            Avenue Z Team
          </button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/[0.06]" />
          <span className="text-xs font-bold uppercase tracking-widest text-text-muted">
            Client Portals
          </span>
          <div className="h-px flex-1 bg-white/[0.06]" />
        </div>

        {/* Client portals */}
        {clients.map((client) => (
          <form
            key={client.slug}
            action={demoLoginClient.bind(null, client.slug, client.name)}
          >
            <button
              type="submit"
              className="mb-3 flex w-full items-center gap-3 rounded-[100px] bg-[#3a3a3a] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-bg-subtle"
            >
              {client.logoUrl ? (
                <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full overflow-hidden ${
                  client.slug === 'avenue-z' ? 'bg-black p-1' : ''
                }`}>
                  <Image
                    src={client.logoUrl}
                    alt={client.name}
                    width={28}
                    height={28}
                    className={client.slug === 'avenue-z' ? 'h-4 w-4 object-contain' : 'h-7 w-7 rounded-full object-cover'}
                  />
                </span>
              ) : (
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-[10px] font-extrabold">
                  {client.name.charAt(0)}
                </span>
              )}
              {client.name}
            </button>
          </form>
        ))}
      </div>
    </div>
  )
}
