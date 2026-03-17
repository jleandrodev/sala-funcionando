import { signOut } from '@/lib/server-actions/auth.actions'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { AppShell } from './components/AppShell'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  const fullName = user.user_metadata?.full_name || ''
  const initials = fullName
    ? fullName.split(' ').slice(0, 2).map((w: string) => w[0]?.toUpperCase()).join('')
    : (user.email?.[0]?.toUpperCase() ?? 'P')

  return (
    <AppShell
      userName={fullName || user.email || 'Professor(a)'}
      userEmail={user.email ?? ''}
      userInitials={initials}
      userAvatar={user.user_metadata?.avatar_url}
      signOutAction={signOut}
    >
      {children}
    </AppShell>
  )
}
