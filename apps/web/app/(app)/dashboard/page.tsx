'use client'

import { ConditionSelector, Button, Loading } from '@sala-funcionando/ui'
import { TipoCondicao } from '@sala-funcionando/domain'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getTurmasAction } from '@/lib/server-actions/turma.actions'
import { signOut } from '@/lib/server-actions/auth.actions'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'

export default function DashboardPage() {
  const router = useRouter()
  const [turmas, setTurmas] = useState<any[]>([])
  const [selectedTurmaId, setSelectedTurmaId] = useState('')
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      const user = session?.user
      
      if (!user) {
        router.push('/login')
        return
      }

      setUser(user)
      const data = await getTurmasAction(user.id)
      setTurmas(data)
      if (data.length > 0) {
        setSelectedTurmaId(data[0].id)
      }
      setLoading(false)
    }
    load()
  }, [router])

  const conditions = [
    { id: TipoCondicao.TEA, label: 'Autismo (TEA)', icon: '🧩' },
    { id: TipoCondicao.DOWN, label: 'Síndrome de Down', icon: '❤️' },
    { id: TipoCondicao.AHSD, label: 'Altas Habilidades', icon: '🚀' },
    { id: TipoCondicao.OUTRO, label: 'Outras Condições', icon: '✨' },
  ]

  const handleSelect = (id: string) => {
    const url = `/protocolo/${id.toLowerCase()}${selectedTurmaId ? `?turmaId=${selectedTurmaId}` : ''}`
    router.push(url)
  }

  if (loading) {
    return <Loading fullScreen />
  }

  return (
    <main className="p-6 sm:p-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <header>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Olá, {user?.user_metadata?.full_name?.split(' ')[0] || 'Professor(a)'}
          </h1>
          <p className="text-lg text-slate-500">
            Qual a situação da sua sala agora?
          </p>
        </header>

        <section className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100 dark:bg-neutral-900 dark:border-neutral-800 space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-neutral-100 pb-6 dark:border-neutral-800">
            <div className="flex-1 w-full">
              <label className="block text-sm font-bold text-neutral-400 mb-2 uppercase tracking-widest">
                Você está em qual turma?
              </label>
              {turmas.length > 0 ? (
                <select 
                  value={selectedTurmaId}
                  onChange={(e) => setSelectedTurmaId(e.target.value)}
                  className="w-full p-4 rounded-xl border border-neutral-200 bg-neutral-50 focus:ring-2 focus:ring-brand-500 outline-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                >
                  {turmas.map(t => (
                    <option key={t.id} value={t.id}>{t.nome}</option>
                  ))}
                </select>
              ) : (
                <div className="flex items-center gap-4">
                  <p className="text-neutral-500 text-sm italic">Nenhuma turma cadastrada.</p>
                  <Button variant="ghost" size="sm" onClick={() => router.push('/turmas')}>
                    Cadastrar agora
                  </Button>
                </div>
              )}
            </div>
          </div>

          <ConditionSelector 
            conditions={conditions} 
            onSelect={handleSelect}
          />
        </section>

        <footer className="text-center pt-8">
          <p className="text-sm text-neutral-400">
            Sala Funcionando &copy; 2026
          </p>
        </footer>
      </div>
    </main>
  )
}
