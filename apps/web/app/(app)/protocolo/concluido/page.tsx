'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button, FormField, Loading } from '@sala-funcionando/ui'
import { useState, useEffect, Suspense } from 'react'
import { getTurmasAction } from '@/lib/server-actions/turma.actions'
import { saveHistoricoAction } from '@/lib/server-actions/historico.actions'
import { createClient } from '@/utils/supabase/client'

function ProtocoloConcluidoContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const protocoloId = searchParams.get('protocoloId')
  const etapasTotal = searchParams.get('etapasTotal')

  const [turmas, setTurmas] = useState<any[]>([])
  const [selectedTurmaId, setSelectedTurmaId] = useState('')
  const [alunoNome, setAlunoNome] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      const data = await getTurmasAction(user.id)
      setTurmas(data)
      setLoading(false)
    }
    load()
  }, [router])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedTurmaId) return

    setSaving(true)
    const result = await saveHistoricoAction({
      turmaId: selectedTurmaId,
      protocoloId: protocoloId || 'unknown',
      etapaAlcancada: Number(etapasTotal) || 0,
      helpAcionado: false
    })

    if (result.success) {
      setSaved(true)
    } else {
      alert(result.error)
    }
    setSaving(false)
  }

  if (loading) return <Loading fullScreen />

  if (saved) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6 bg-background">
        <div className="bg-white p-12 rounded-3xl shadow-sm border border-neutral-100 text-center space-y-6 max-w-md dark:bg-neutral-900 dark:border-neutral-800">
           <div className="text-6xl animate-bounce">✅</div>
           <h2 className="text-3xl font-bold text-foreground">Relatório Salvo!</h2>
           <p className="text-neutral-500">Obrigado por registrar o atendimento. Isso ajuda a construir a memória da sua sala e melhorar as sugestões futuras.</p>
           <Button variant="primary" onClick={() => router.push('/dashboard')} fullWidth>
             Ir para o Dashboard
           </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen p-6 sm:p-24 bg-background">
      <div className="w-full max-w-2xl mx-auto space-y-12">
        <header className="text-center space-y-4">
          <div className="text-6xl">🙌</div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Situação sob controle!
          </h1>
          <p className="text-xl text-neutral-500 max-w-lg mx-auto">
            Você fez um ótimo trabalho para manter a calma e a segurança do aluno.
          </p>
        </header>

        <section className="bg-brand-50 p-8 rounded-3xl border border-brand-100 space-y-4 dark:bg-brand-900/20 dark:border-brand-900/30">
          <h3 className="text-lg font-bold text-brand-700 dark:text-brand-300">Dicas Pós-Atendimento:</h3>
          <ul className="space-y-3 text-brand-800 dark:text-brand-200">
            <li className="flex gap-2"><span>•</span> <span>Dê um tempo de descanso sensorial para o aluno (5-10 min).</span></li>
            <li className="flex gap-2"><span>•</span> <span>Normalize o ambiente com os demais colegas sem focar na crise.</span></li>
            <li className="flex gap-2"><span>•</span> <span>Evite cobrar a tarefa perdida imediatamente; foque na regulação.</span></li>
            <li className="flex gap-2"><span>•</span> <span>Beba água e respire fundo. Você também passou por um momento de estresse.</span></li>
          </ul>
        </section>

        <section className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100 dark:bg-neutral-900 dark:border-neutral-800 space-y-8">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-foreground">Registrar Atendimento</h3>
            <p className="text-neutral-500 text-sm">O histórico ajuda a entender o que funciona para cada turma.</p>
          </div>
          
          <form onSubmit={handleSave} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Turma Atendida</label>
              <select 
                value={selectedTurmaId}
                onChange={(e) => setSelectedTurmaId(e.target.value)}
                className="w-full p-4 rounded-xl border border-neutral-200 bg-neutral-50 focus:ring-2 focus:ring-brand-500 outline-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                required
              >
                <option value="">Selecione uma turma...</option>
                {turmas.map(t => (
                  <option key={t.id} value={t.id}>{t.nome} ({t.faixaEtaria})</option>
                ))}
              </select>
            </div>

            <FormField 
              label="Nome do Aluno (Opcional)"
              placeholder="Ex: Aluno A ou iniciais"
              value={alunoNome}
              onChange={(e) => setAlunoNome(e.target.value)}
              helperText="Respeitamos a LGPD. Não é obrigatório identificar o aluno."
            />

            <div className="pt-6 flex flex-col sm:flex-row gap-4">
              <Button type="button" variant="ghost" onClick={() => router.push('/dashboard')} className="sm:flex-1">
                Pular Registro
              </Button>
              <Button 
                type="submit" 
                variant="primary" 
                disabled={!selectedTurmaId || saving} 
                className="sm:flex-1"
              >
                {saving ? 'Salvando...' : 'Salvar no Histórico'}
              </Button>
            </div>
          </form>
        </section>
      </div>
    </main>
  )
}

export default function ProtocoloConcluidoPage() {
  return (
    <Suspense fallback={<Loading fullScreen />}>
      <ProtocoloConcluidoContent />
    </Suspense>
  )
}
