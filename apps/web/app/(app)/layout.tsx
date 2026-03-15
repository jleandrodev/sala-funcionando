import { signOut } from '@/lib/server-actions/auth.actions'
import { Button } from '@sala-funcionando/ui'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

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

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-2xl">🧩</span>
            <span className="text-xl font-bold text-slate-900 hidden sm:inline">Sala Funcionando</span>
          </Link>

          <nav className="flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-medium text-slate-600 hover:text-brand-600">
              Dashboard
            </Link>
            <Link href="/turmas" className="text-sm font-medium text-slate-600 hover:text-brand-600">
              Turmas
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Professor(a)</p>
              <p className="text-sm font-semibold text-slate-700">{user.user_metadata?.full_name || user.email}</p>
            </div>
            <form action={signOut}>
              <Button type="submit" variant="ghost" size="sm" className="text-slate-400 hover:text-danger-500">
                Sair
              </Button>
            </form>
          </div>
        </div>
      </header>

      {children}
    </div>
  )
}
