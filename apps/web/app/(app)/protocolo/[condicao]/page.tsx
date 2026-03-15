'use client'

import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { SituationSelector } from '@sala-funcionando/ui'
import { SubSituacao, TipoCondicao } from '@sala-funcionando/domain'
import { Suspense } from 'react'

const situations = [
  { id: SubSituacao.CRISE, label: 'Crise Aguda', description: 'Gritos, choro intenso, desorganização total.' },
  { id: SubSituacao.TRANSICAO, label: 'Transição', description: 'Dificuldade em mudar de atividade ou ambiente.' },
  { id: SubSituacao.INTERACAO_SOCIAL, label: 'Interação Social', description: 'Recusa em interagir ou conflitos com colegas.' },
  { id: SubSituacao.ESTEREOTIPIA, label: 'Estereotipias', description: 'Movimentos repetitivos intensos que impedem a tarefa.' },
  { id: SubSituacao.AGRESSIVIDADE, label: 'Agressividade', description: 'Bater, morder ou jogar objetos.' },
  { id: SubSituacao.FUGA, label: 'Fuga', description: 'Tentar sair da sala ou se esconder.' },
  { id: SubSituacao.ALIMENTACAO, label: 'Alimentação', description: 'Recusa alimentar ou seletividade extrema.' },
]

function SituacaoContent() {
  const { condicao } = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const turmaId = searchParams.get('turmaId')

  const handleSelect = (situacao: string) => {
    const url = `/protocolo/${condicao}/${situacao.toLowerCase()}${turmaId ? `?turmaId=${turmaId}` : ''}`
    router.push(url)
  }

  const condicaoLabel = condicao === TipoCondicao.TEA.toLowerCase() ? 'Autismo (TEA)' : condicao

  return (
    <main className="min-h-screen p-6 sm:p-24 bg-background">
      <div className="w-full max-w-4xl mx-auto space-y-12">
        <header className="space-y-4">
          <button 
            onClick={() => router.push('/')}
            className="text-brand-500 hover:underline flex items-center gap-2"
          >
            ← Voltar para condições
          </button>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            O que acontece com {condicaoLabel}?
          </h1>
          <p className="text-xl text-neutral-500">
            Identifique o tipo de comportamento para iniciarmos o protocolo de suporte.
          </p>
        </header>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-neutral-100 dark:bg-neutral-900 dark:border-neutral-800">
          <SituationSelector 
            situations={situations} 
            onSelect={handleSelect}
          />
        </div>
      </div>
    </main>
  )
}

export default function SituacaoPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <SituacaoContent />
    </Suspense>
  )
}
