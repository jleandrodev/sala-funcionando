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
      if (!user) { router.push('/login'); return }
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
      helpAcionado: false,
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
      <div style={{ backgroundColor: '#F0F2F5' }} className="min-h-full flex items-center justify-center px-4 py-12">
        <div className="bg-white p-12 rounded-3xl shadow-sm border border-neutral-100 text-center space-y-6 max-w-md w-full">
          <div className="text-6xl animate-bounce">✅</div>
          <h2 className="text-3xl font-bold text-neutral-900">Relatório Salvo!</h2>
          <p className="text-neutral-500">
            Obrigado por registrar o atendimento. Isso ajuda a construir a memória da sua sala.
          </p>
          <Button variant="primary" onClick={() => router.push('/dashboard')} fullWidth>
            Ir para o Dashboard
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: '#F0F2F5' }} className="min-h-full px-4 py-6 lg:px-8 lg:py-8">
      <div className="max-w-2xl mx-auto space-y-5">

        {/* Success banner */}
        <div
          className="relative rounded-2xl px-6 py-6 overflow-hidden text-center"
          style={{ background: 'linear-gradient(135deg, #14532D 0%, #16A34A 100%)' }}
        >
          <div className="relative z-10">
            <div className="text-5xl mb-3">🙌</div>
            <h1 className="text-white text-2xl font-bold mb-1">Situação sob controle!</h1>
            <p className="text-white/75 text-sm">Você fez um ótimo trabalho mantendo a calma e a segurança do aluno.</p>
          </div>
          <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full opacity-10 bg-white" />
          <div className="absolute -right-2 bottom-0 w-20 h-20 rounded-full opacity-10 bg-white" />
        </div>

        {/* Post-care tips */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100">
          <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4">Dicas Pós-Atendimento</p>
          <ul className="space-y-3">
            {[
              'Dê um tempo de descanso sensorial para o aluno (5–10 min).',
              'Normalize o ambiente com os demais colegas sem focar na crise.',
              'Evite cobrar a tarefa perdida imediatamente; foque na regulação.',
              'Beba água e respire fundo. Você também passou por um momento de estresse.',
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-neutral-700">
                <span className="w-5 h-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Register form */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100">
          <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">Registrar Atendimento</p>
          <p className="text-sm text-neutral-500 mb-6">O histórico ajuda a entender o que funciona para cada turma.</p>

          <form onSubmit={handleSave} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-neutral-700">Turma Atendida</label>
              <select
                value={selectedTurmaId}
                onChange={(e) => setSelectedTurmaId(e.target.value)}
                className="w-full p-4 rounded-xl border border-neutral-200 bg-white text-neutral-900 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
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

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
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
        </div>

      </div>
    </div>
  )
}

export default function ProtocoloConcluidoPage() {
  return (
    <Suspense fallback={<Loading fullScreen />}>
      <ProtocoloConcluidoContent />
    </Suspense>
  )
}
