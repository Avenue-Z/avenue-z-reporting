'use server'

import { signIn, signOut } from '@/auth'

export async function signInWithGoogle() {
  await signIn('google', { redirectTo: '/dashboard' })
}

export async function signInWithCredentials(formData: FormData) {
  await signIn('credentials', {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    redirectTo: '/dashboard',
  })
}

export async function signOutAction() {
  await signOut({ redirectTo: '/login' })
}
