import { redirect } from 'next/navigation'
import { getDemoSession } from '@/lib/demo-auth'

export default async function Home() {
  const session = await getDemoSession()

  if (session?.role === 'internal') {
    redirect('/dashboard')
  }
  if (session?.role === 'client' && session.clientSlug) {
    redirect(`/portal/${session.clientSlug}/reports`)
  }

  redirect('/login')
}
