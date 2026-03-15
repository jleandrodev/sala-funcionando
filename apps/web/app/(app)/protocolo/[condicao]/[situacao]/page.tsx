'use client'

import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import { ProtocolCard, Button, ProgressIndicator, Loading } from '@sala-funcionando/ui'
import { getProtocoloAction } from '@/lib/server-actions/protocolo.actions'
import { sendHelpAction } from '@/lib/server-actions/help.actions'
import { adaptProtocoloAction } from '@/lib/server-actions/ai.actions'
import { getHistoricoPorTurmaAction } from '@/lib/server-actions/historico.actions'
import { createClient } from '@/utils/supabase/client'

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
  const [adapting, setAdapting] = useState(false)
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
        // Filtrar apenas históricos para este protocolo específico
        setHistoricoTurma(history.filter(h => h.protocoloId === data?.id))
      }
      
      setLoading(false)
    }
    load()
  }, [condicao, situacao, turmaId])

  if (loading) {
    return <Loading fullScreen />
  }

  if (!protocolo || !protocolo.etapas || protocolo.etapas.length === 0) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100 text-center space-y-4 max-w-md dark:bg-neutral-900 dark:border-neutral-800">
          <div className="text-5xl">⚠️</div>
          <h2 className="text-2xl font-bold text-foreground">Protocolo não encontrado</h2>
          <p className="text-neutral-500">Não encontramos orientações cadastradas para esta situação específica ainda.</p>
          <Button variant="primary" onClick={() => router.push('/dashboard')} fullWidth>
            Voltar ao Dashboard
          </Button>
        </div>
      </main>
    )
  }

  const currentStep = protocolo.etapas[currentStepIndex]
  const isLastStep = currentStepIndex === protocolo.etapas.length - 1

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
    if (!user) {
      alert('Você precisa estar logado para acionar o HELP.')
      return
    }

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

  // Lógica de "Memória"
  const totalAtendimentos = historicoTurma.length
  const sucessos = historicoTurma.filter(h => h.etapaAlcancada >= protocolo.etapas.length - 1 && !h.helpAcionado).length
  const percentualSucesso = totalAtendimentos > 0 ? Math.round((sucessos / totalAtendimentos) * 100) : null

  return (
    <main className="min-h-screen p-6 sm:p-24 bg-background">
      <div className="w-full max-w-2xl mx-auto space-y-8">
        <header className="flex justify-between items-start">
          <div className="space-y-2 flex-1">
            <h2 className="text-sm font-bold uppercase tracking-wider text-brand-600">
              {condicao} / {situacao.replace(/-/g, ' ')}
            </h2>
            <ProgressIndicator 
              currentStep={currentStepIndex + 1} 
              totalSteps={protocolo.etapas.length} 
            />
          </div>
        </header>

        {percentualSucesso !== null && currentStepIndex === 0 && (
          <section className="bg-blue-50 p-4 rounded-2xl border border-blue-100 dark:bg-blue-900/20 dark:border-blue-800">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              💡 <strong>Memória da Sala:</strong> Este protocolo funcionou em {percentualSucesso}% das vezes que você o seguiu nesta turma.
            </p>
          </section>
        )}

        <ProtocolCard
          title={currentStep.instrucao}
          description="Siga estas orientações calmamente para auxiliar o aluno."
          warnings={currentStep.oQueEvitar ? [currentStep.oQueEvitar] : []}
          suggestions={currentStep.frasesProntas}
          stepNumber={currentStepIndex + 1}
          totalSteps={protocolo.etapas.length}
        />

        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="secondary" onClick={handleBack} fullWidth={true} className="sm:flex-1">
            Voltar
          </Button>
          <Button variant="primary" onClick={handleNext} fullWidth={true} className="sm:flex-1">
            {isLastStep ? 'Finalizar Atendimento' : 'Próxima Etapa'}
          </Button>
        </div>

        <div className="pt-8 border-t border-neutral-200">
          <Button 
            variant="danger" 
            fullWidth 
            onClick={handleHelp}
            className="py-6 text-lg font-bold shadow-lg shadow-danger-100"
          >
            ESTOU PRECISANDO DE AJUDA! (HELP)
          </Button>
        </div>
      </div>
    </main>
  )
}

export default function ProtocoloStepPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ProtocoloStepContent />
    </Suspense>
  )
}
