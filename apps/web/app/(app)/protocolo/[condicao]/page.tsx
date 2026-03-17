'use client'

import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { SituationSelector } from '@sala-funcionando/ui'
import { SubSituacao } from '@sala-funcionando/domain'
import { Suspense } from 'react'

const CONDITION_META: Record<string, { label: string; icon: string; gradient: string }> = {
  tea:     { label: 'Transtorno do Espectro Autista', icon: '🧩', gradient: 'linear-gradient(135deg, #1565C0 0%, #2196F3 100%)' },
  dislexia:{ label: 'Dislexia',                       icon: '🧠', gradient: 'linear-gradient(135deg, #8D4E28 0%, #E8A87C 100%)' },
  ahsd:    { label: 'Altas Habilidades',              icon: '🌟', gradient: 'linear-gradient(135deg, #6A1B9A 0%, #9C27B0 100%)' },
  tdah:    { label: 'TDAH',                           icon: '🚀', gradient: 'linear-gradient(135deg, #4E6B0A 0%, #8BC34A 100%)' },
  di_leve: { label: 'Deficiência Intelectual Leve',   icon: '💜', gradient: 'linear-gradient(135deg, #00838F 0%, #26C6DA 100%)' },
}

const situations = [
  { id: SubSituacao.CRISE,            label: 'Crise Aguda',       description: 'Gritos, choro intenso, desorganização total.',              icon: '🔴', color: '#EF4444', textColor: '#ffffff' },
  { id: SubSituacao.TRANSICAO,        label: 'Transição',         description: 'Dificuldade em mudar de atividade ou ambiente.',            icon: '🔄', color: '#F59E0B', textColor: '#ffffff' },
  { id: SubSituacao.INTERACAO_SOCIAL, label: 'Interação Social',  description: 'Recusa em interagir ou conflitos com colegas.',             icon: '👥', color: '#3B82F6', textColor: '#ffffff' },
  { id: SubSituacao.ESTEREOTIPIA,     label: 'Estereotipias',     description: 'Movimentos repetitivos intensos que impedem a tarefa.',     icon: '🔃', color: '#8B5CF6', textColor: '#ffffff' },
  { id: SubSituacao.AGRESSIVIDADE,    label: 'Agressividade',     description: 'Bater, morder ou jogar objetos.',                          icon: '⚡', color: '#F97316', textColor: '#ffffff' },
  { id: SubSituacao.FUGA,             label: 'Fuga',              description: 'Tentar sair da sala ou se esconder.',                      icon: '🚪', color: '#14B8A6', textColor: '#ffffff' },
  { id: SubSituacao.ALIMENTACAO,      label: 'Alimentação',       description: 'Recusa alimentar ou seletividade extrema.',                icon: '🍽️', color: '#22C55E', textColor: '#ffffff' },
]

function SituacaoContent() {
  const { condicao } = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const turmaId = searchParams.get('turmaId')

  const condKey = (condicao as string).toLowerCase()
  const condMeta = CONDITION_META[condKey] ?? {
    label: (condicao as string).toUpperCase(),
    icon: '📋',
    gradient: 'linear-gradient(135deg, #1E1F3B 0%, #3730A3 100%)',
  }

  const handleSelect = (situacao: string) => {
    const url = `/protocolo/${condicao}/${situacao.toLowerCase()}${turmaId ? `?turmaId=${turmaId}` : ''}`
    router.push(url)
  }

  return (
    <div style={{ backgroundColor: '#F0F2F5' }} className="min-h-full px-4 py-6 lg:px-8 lg:py-8">

      {/* Breadcrumb */}
      <button
        onClick={() => router.push('/dashboard')}
        className="text-sm font-medium text-neutral-500 hover:text-neutral-800 transition-colors mb-4 flex items-center gap-1"
      >
        ← Voltar para condições
      </button>

      {/* Header banner */}
      <div
        className="relative rounded-2xl px-6 py-6 mb-6 overflow-hidden"
        style={{ background: condMeta.gradient }}
      >
        <div className="relative z-10 flex items-center gap-4">
          <span className="text-4xl">{condMeta.icon}</span>
          <div>
            <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-0.5">Protocolo de Suporte</p>
            <h1 className="text-white text-xl font-bold">{condMeta.label}</h1>
            <p className="text-white/70 text-sm mt-0.5">Selecione o tipo de situação para iniciar.</p>
          </div>
        </div>
        <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full opacity-10 bg-white" />
        <div className="absolute -right-2 bottom-0 w-20 h-20 rounded-full opacity-10 bg-white" />
      </div>

      {/* Section label */}
      <div className="flex items-center gap-3 mb-4 px-1">
        <span className="text-xl">❓</span>
        <span className="text-sm font-bold text-neutral-600 uppercase tracking-widest">
          O que está acontecendo?
        </span>
      </div>

      <SituationSelector
        situations={situations}
        onSelect={handleSelect}
        variant="rect-grid"
      />
    </div>
  )
}

export default function SituacaoPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <SituacaoContent />
    </Suspense>
  )
}
