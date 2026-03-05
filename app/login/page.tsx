import { signInWithGoogle, signInWithCredentials } from '@/app/actions/auth'
import { AvenueZLogo } from '@/components/layout/avenue-z-logo'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm rounded-lg border border-white/[0.06] bg-bg-surface p-8">
        <div className="mb-6 flex justify-center">
          <AvenueZLogo height={22} className="text-white" />
        </div>

        <h1 className="mb-6 text-center text-2xl font-extrabold text-white">
          Sign In
        </h1>

        {/* Google sign-in */}
        <form action={signInWithGoogle}>
          <button
            type="submit"
            className="mb-4 w-full rounded-[100px] bg-white px-6 py-3 text-sm font-bold text-black transition-opacity hover:opacity-90"
          >
            Continue with Google
          </button>
        </form>

        <div className="divider-full my-4" />

        {/* Email/password */}
        <form action={signInWithCredentials} className="flex flex-col gap-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="rounded-md border border-white/10 bg-bg-surface px-4 py-3 text-sm text-white placeholder:text-text-muted focus:border-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan/15"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="rounded-md border border-white/10 bg-bg-surface px-4 py-3 text-sm text-white placeholder:text-text-muted focus:border-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan/15"
          />
          <button
            type="submit"
            className="mt-2 rounded-[100px] bg-[#3a3a3a] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-bg-subtle"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
