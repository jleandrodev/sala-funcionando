'use client'

import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import { ProtocolCard, Button, ProgressIndicator, Loading } from '@sala-funcionando/ui'
import { getProtocoloAction } from '@/lib/server-actions/protocolo.actions'
import { sendHelpAction } from '@/lib/server-actions/help.actions'
import { getHistoricoPorTurmaAction } from '@/lib/server-actions/historico.actions'
import { createClient } from '@/utils/supabase/client'

const CONDITION_META: Record<string, { label: string; icon: string; gradient: string }> = {
  tea:     { label: 'TEA',      icon: '🧩', gradient: 'linear-gradient(135deg, #1565C0 0%, #2196F3 100%)' },
  dislexia:{ label: 'Dislexia', icon: '🧠', gradient: 'linear-gradient(135deg, #8D4E28 0%, #E8A87C 100%)' },
  ahsd:    { label: 'AHSD',     icon: '🌟', gradient: 'linear-gradient(135deg, #6A1B9A 0%, #9C27B0 100%)' },
  tdah:    { label: 'TDAH',     icon: '🚀', gradient: 'linear-gradient(135deg, #4E6B0A 0%, #8BC34A 100%)' },
  di_leve: { label: 'D.I. Leve',icon: '💜', gradient: 'linear-gradient(135deg, #00838F 0%, #26C6DA 100%)' },
}

function ProtocoloStepContent() {
  const params = useParams()
  const searchParams = useSearchParams()
  const condicao = params.condicao as string
  const situacao = params.situacao as string
  const turmaId = searchParams.get('turmaId')

  const router = useRouter()
  const [protocolo, setProtocolo] = useState<any>(null)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [historicoTurma, setHistoricoTurma] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      const data = await getProtocoloAction(condicao, situacao)
      setProtocolo(data)

      if (turmaId) {
        const history = await getHistoricoPorTurmaAction(turmaId)
        setHistoricoTurma(history.filter(h => h.protocoloId === data?.id))
      }

      setLoading(false)
    }
    load()
  }, [condicao, situacao, turmaId])

  if (loading) return <Loading fullScreen />

  if (!protocolo || !protocolo.etapas || protocolo.etapas.length === 0) {
    return (
      <div style={{ backgroundColor: '#F0F2F5' }} className="min-h-full flex items-center justify-center px-4 py-12">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100 text-center space-y-4 max-w-md w-full">
          <div className="text-5xl">⚠️</div>
          <h2 className="text-2xl font-bold text-neutral-900">Protocolo não encontrado</h2>
          <p className="text-neutral-500">Não encontramos orientações cadastradas para esta situação específica ainda.</p>
          <Button variant="primary" onClick={() => router.push('/dashboard')} fullWidth>
            Voltar ao Dashboard
          </Button>
        </div>
      </div>
    )
  }

  const currentStep = protocolo.etapas[currentStepIndex]
  const isLastStep = currentStepIndex === protocolo.etapas.length - 1
  const condMeta = CONDITION_META[condicao.toLowerCase()] ?? { label: condicao.toUpperCase(), icon: '📋', gradient: 'linear-gradient(135deg, #1E1F3B 0%, #3730A3 100%)' }

  const totalAtendimentos = historicoTurma.length
  const sucessos = historicoTurma.filter(h => h.etapaAlcancada >= protocolo.etapas.length - 1 && !h.helpAcionado).length
  const percentualSucesso = totalAtendimentos > 0 ? Math.round((sucessos / totalAtendimentos) * 100) : null

  const handleNext = () => {
    if (isLastStep) {
      router.push(`/protocolo/concluido?protocoloId=${protocolo.id}&etapasTotal=${protocolo.etapas.length}${turmaId ? `&turmaId=${turmaId}` : ''}`)
    } else {
      setCurrentStepIndex(prev => prev + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleBack = () => {
    if (currentStepIndex === 0) {
      router.back()
    } else {
      setCurrentStepIndex(prev => prev - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleHelp = async () => {
    if (!user) { alert('Você precisa estar logado para acionar o HELP.'); return }
    const ok = confirm('Isso enviará um alerta de emergência. Tem certeza?')
    if (!ok) return
    setLoading(true)
    const result = await sendHelpAction(user.id, `Emergência na sala! Condição: ${condicao}, Situação: ${situacao}`)
    if (result.success) {
      alert('Alerta enviado com sucesso. Aguarde o suporte.')
    } else {
      alert(result.error)
    }
    setLoading(false)
  }

  return (
    <div style={{ backgroundColor: '#F0F2F5' }} className="min-h-full px-4 py-6 lg:px-8 lg:py-8">
      <div className="max-w-2xl mx-auto space-y-5">

        {/* Header banner */}
        <div
          className="relative rounded-2xl px-5 py-4 overflow-hidden"
          style={{ background: condMeta.gradient }}
        >
          <div className="relative z-10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{condMeta.icon}</span>
              <div>
                <p className="text-white/70 text-xs font-bold uppercase tracking-widest">
                  {condMeta.label} · {situacao.replace(/-/g, ' ')}
                </p>
                <p className="text-white text-sm font-semibold mt-0.5">Siga as etapas com calma</p>
              </div>
            </div>
            <ProgressIndicator
              currentStep={currentStepIndex + 1}
              totalSteps={protocolo.etapas.length}
              inverted
            />
          </div>
          <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full opacity-10 bg-white" />
        </div>

        {/* Memória da sala */}
        {percentualSucesso !== null && currentStepIndex === 0 && (
          <div className="bg-blue-50 px-5 py-4 rounded-2xl border border-blue-100 flex items-start gap-3">
            <span className="text-xl flex-shrink-0">💡</span>
            <p className="text-sm text-blue-700">
              <strong>Memória da Sala:</strong> Este protocolo funcionou em{' '}
              <strong>{percentualSucesso}%</strong> das vezes que você o aplicou nesta turma.
            </p>
          </div>
        )}

        {/* Protocol card */}
        <ProtocolCard
          title={currentStep.instrucao}
          description="Siga estas orientações calmamente para auxiliar o aluno."
          warnings={currentStep.oQueEvitar ? [currentStep.oQueEvitar] : []}
          suggestions={currentStep.frasesProntas}
          stepNumber={currentStepIndex + 1}
          totalSteps={protocolo.etapas.length}
        />

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="secondary" onClick={handleBack} fullWidth className="sm:flex-1">
            Voltar
          </Button>
          <Button variant="primary" onClick={handleNext} fullWidth className="sm:flex-1">
            {isLastStep ? 'Finalizar Atendimento' : 'Próxima Etapa'}
          </Button>
        </div>

        {/* Early finish — visible on any step except the last */}
        {!isLastStep && (
          <Button
            variant="secondary"
            fullWidth
            onClick={() => router.push(`/protocolo/concluido?protocoloId=${protocolo.id}&etapasTotal=${protocolo.etapas.length}${turmaId ? `&turmaId=${turmaId}` : ''}`)}
            className="border-green-300 text-green-700 hover:bg-green-50"
          >
            ✅ Situação resolvida — Finalizar Atendimento
          </Button>
        )}

        {/* HELP button */}
        <div className="pt-4 border-t border-neutral-300">
          <Button
            variant="danger"
            fullWidth
            onClick={handleHelp}
            className="py-6 text-lg font-bold shadow-lg shadow-red-200"
          >
            ESTOU PRECISANDO DE AJUDA! (HELP)
          </Button>
        </div>

      </div>
    </div>
  )
}

export default function ProtocoloStepPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ProtocoloStepContent />
    </Suspense>
  )
}
