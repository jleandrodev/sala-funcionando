'use client'

import { ConditionSelector, Loading } from '@sala-funcionando/ui'
import { TipoCondicao } from '@sala-funcionando/domain'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getTurmasAction } from '@/lib/server-actions/turma.actions'
import { getHistoricoPorTurmaAction, getHistoricoComCondicaoAction } from '@/lib/server-actions/historico.actions'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area,
} from 'recharts'

const CONDITIONS = [
  { id: TipoCondicao.TEA,      label: 'Transtorno do\nEspectro Autista', icon: '🧩', color: '#2196F3', textColor: '#ffffff' },
  { id: TipoCondicao.DISLEXIA, label: 'Dislexia',                        icon: '🧠', color: '#F2C9B0', textColor: '#3D2B1F' },
  { id: TipoCondicao.AHSD,     label: 'Altas Habilidades',               icon: '🌟', color: '#9C27B0', textColor: '#ffffff' },
  { id: TipoCondicao.TDAH,     label: 'TDAH',                            icon: '🚀', color: '#C6DC39', textColor: '#2D3300' },
  { id: TipoCondicao.DI_LEVE,  label: 'Deficiência\nIntelectual Leve',   icon: '💜', color: '#26C6DA', textColor: '#ffffff' },
]

const CONDITION_LABELS: Record<string, string> = {
  TEA: 'TEA', DISLEXIA: 'Dislexia', AHSD: 'Alt. Hab.',
  TDAH: 'TDAH', DI_LEVE: 'D.I. Leve', DOWN: 'Down', OUTRO: 'Outro',
}

const CONDITION_COLORS: Record<string, string> = {
  TEA: '#2196F3', DISLEXIA: '#E8A87C', AHSD: '#9C27B0',
  TDAH: '#A3B820', DI_LEVE: '#26C6DA', DOWN: '#F48FB1', OUTRO: '#90A4AE',
}

function buildBarData(history: any[]) {
  const counts: Record<string, number> = {}
  history.forEach(h => {
    const k = h.condicao ?? 'OUTRO'
    counts[k] = (counts[k] ?? 0) + 1
  })
  return Object.entries(counts).map(([key, total]) => ({
    name: CONDITION_LABELS[key] ?? key,
    total,
    fill: CONDITION_COLORS[key] ?? '#6366F1',
  }))
}

function buildAreaData(history: any[]) {
  const last30 = Array.from({ length: 30 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (29 - i))
    return d.toISOString().slice(0, 10)
  })
  const counts: Record<string, number> = {}
  history.forEach(h => {
    const day = new Date(h.data).toISOString().slice(0, 10)
    counts[day] = (counts[day] ?? 0) + 1
  })
  return last30.map(day => ({
    day: day.slice(5),          // MM-DD
    atendimentos: counts[day] ?? 0,
  }))
}

export default function DashboardPage() {
  const router = useRouter()
  const [turmas, setTurmas]                     = useState<any[]>([])
  const [selectedTurmaId, setSelectedTurmaId]   = useState('')
  const [history, setHistory]                   = useState<any[]>([])
  const [historyFull, setHistoryFull]           = useState<any[]>([])
  const [userName, setUserName]                 = useState('')
  const [loading, setLoading]                   = useState(true)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      const user = session?.user
      if (!user) { router.push('/login'); return }

      setUserName(user.user_metadata?.full_name?.split(' ')[0] || 'Professor(a)')
      const data = await getTurmasAction(user.id)
      setTurmas(data)
      if (data.length > 0) {
        setSelectedTurmaId(data[0].id)
        const [hist, histFull] = await Promise.all([
          getHistoricoPorTurmaAction(data[0].id),
          getHistoricoComCondicaoAction(data[0].id),
        ])
        setHistory(hist.slice(0, 5))
        setHistoryFull(histFull)
      }
      setLoading(false)
    }
    load()
  }, [router])

  useEffect(() => {
    if (!selectedTurmaId) return
    Promise.all([
      getHistoricoPorTurmaAction(selectedTurmaId),
      getHistoricoComCondicaoAction(selectedTurmaId),
    ]).then(([hist, histFull]) => {
      setHistory(hist.slice(0, 5))
      setHistoryFull(histFull)
    })
  }, [selectedTurmaId])

  const handleSelect = (id: string) => {
    router.push(`/protocolo/${id.toLowerCase()}${selectedTurmaId ? `?turmaId=${selectedTurmaId}` : ''}`)
  }

  if (loading) return <Loading fullScreen />

  const selectedTurma  = turmas.find(t => t.id === selectedTurmaId)
  const barData        = buildBarData(historyFull)
  const areaData       = buildAreaData(historyFull)
  const totalHelp      = historyFull.filter(h => h.helpAcionado).length
  const totalOk        = historyFull.length - totalHelp

  return (
    <div className="flex h-full" style={{ backgroundColor: '#F0F2F5' }}>

      {/* ══════════ CENTER CONTENT ══════════ */}
      <div className="flex-1 min-w-0 px-4 py-6 lg:px-8 lg:py-8">

        {/* Welcome banner */}
        <div
          className="relative rounded-2xl px-6 py-6 mb-6 overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1E1F3B 0%, #3730A3 100%)' }}
        >
          <div className="relative z-10">
            <p className="text-indigo-200 text-sm font-medium mb-1">Olá, {userName} 👋</p>
            <h1 className="text-white text-xl font-bold mb-1">Pronto para atender?</h1>
            <p className="text-indigo-300 text-sm">Selecione a condição do aluno para iniciar o protocolo.</p>
          </div>
          <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full opacity-10" style={{ backgroundColor: '#818CF8' }} />
          <div className="absolute -right-2 bottom-0 w-20 h-20 rounded-full opacity-10" style={{ backgroundColor: '#C7D2FE' }} />
        </div>

        {/* Warning label */}
        <div className="flex items-center gap-3 mb-4 px-1">
          <span className="text-xl">⚠️</span>
          <span className="text-sm font-bold text-neutral-600 uppercase tracking-widest">
            Intercorrência com aluno:
          </span>
        </div>

        {/* Mobile: list | Desktop: rect-grid */}
        <div className="lg:hidden">
          <ConditionSelector conditions={CONDITIONS} onSelect={handleSelect} variant="list" />
        </div>
        <div className="hidden lg:block">
          <ConditionSelector conditions={CONDITIONS} onSelect={handleSelect} variant="rect-grid" />
        </div>

        {/* ── Charts (desktop only) ── */}
        <div className="hidden lg:block mt-8 space-y-5">

          {/* Summary stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Total atendimentos', value: historyFull.length, color: '#6366F1', bg: '#EEF2FF' },
              { label: 'Concluídos com sucesso', value: totalOk, color: '#16A34A', bg: '#F0FDF4' },
              { label: 'Socorro acionado', value: totalHelp, color: '#DC2626', bg: '#FEF2F2' },
            ].map(stat => (
              <div key={stat.label} className="rounded-2xl p-5" style={{ backgroundColor: stat.bg }}>
                <p className="text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
                <p className="text-sm font-medium text-neutral-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-2 gap-4">

            {/* Bar: por condição */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <p className="text-sm font-bold text-neutral-700 mb-4">Atendimentos por condição</p>
              {barData.length === 0 ? (
                <div className="flex items-center justify-center h-40 text-sm text-neutral-400 italic">Sem dados ainda</div>
              ) : (
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={barData} barSize={28}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} width={24} />
                    <Tooltip
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: '12px' }}
                      cursor={{ fill: '#F3F4F6' }}
                    />
                    <Bar dataKey="total" name="Atendimentos" radius={[6, 6, 0, 0]}>
                      {barData.map((entry, i) => (
                        <Cell key={i} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* Area: últimos 30 dias */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <p className="text-sm font-bold text-neutral-700 mb-4">Atendimentos nos últimos 30 dias</p>
              {historyFull.length === 0 ? (
                <div className="flex items-center justify-center h-40 text-sm text-neutral-400 italic">Sem dados ainda</div>
              ) : (
                <ResponsiveContainer width="100%" height={180}>
                  <AreaChart data={areaData}>
                    <defs>
                      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366F1" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                    <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} interval={6} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} width={24} />
                    <Tooltip
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: '12px' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="atendimentos"
                      name="Atendimentos"
                      stroke="#6366F1"
                      strokeWidth={2.5}
                      fill="url(#areaGrad)"
                      dot={false}
                      activeDot={{ r: 5, fill: '#6366F1' }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════ RIGHT PANEL (desktop only) ══════════ */}
      <aside
        className="hidden lg:flex flex-col gap-4 flex-shrink-0 px-4 py-8 border-l border-neutral-200"
        style={{ width: '290px', backgroundColor: '#ffffff' }}
      >
        {/* Turma card */}
        <div>
          <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3">Turma ativa</p>
          {turmas.length > 0 ? (
            <div className="rounded-2xl p-4 space-y-3" style={{ backgroundColor: '#F5F3FF' }}>
              <select
                value={selectedTurmaId}
                onChange={(e) => setSelectedTurmaId(e.target.value)}
                className="w-full text-sm font-bold text-indigo-800 bg-transparent focus:outline-none cursor-pointer"
              >
                {turmas.map(t => (
                  <option key={t.id} value={t.id}>{t.nome}</option>
                ))}
              </select>
              {selectedTurma && (
                <div className="flex gap-3 pt-1 border-t border-indigo-100">
                  <div className="flex-1 text-center">
                    <p className="text-lg font-bold text-indigo-700">{selectedTurma.tamanho}</p>
                    <p className="text-xs text-indigo-400">Alunos</p>
                  </div>
                  <div className="w-px bg-indigo-100" />
                  <div className="flex-1 text-center">
                    <p className="text-lg font-bold text-indigo-700">{selectedTurma.alunosNEE}</p>
                    <p className="text-xs text-indigo-400">NEE</p>
                  </div>
                  <div className="w-px bg-indigo-100" />
                  <div className="flex-1 text-center">
                    <p className="text-xs font-semibold text-indigo-700 leading-tight">{selectedTurma.faixaEtaria}</p>
                    <p className="text-xs text-indigo-400">Idade</p>
                  </div>
                </div>
              )}
              <Link href="/turmas" className="block text-center text-xs font-bold text-indigo-500 hover:text-indigo-700 transition-colors pt-1">
                Gerenciar turmas →
              </Link>
            </div>
          ) : (
            <div className="rounded-2xl p-4 border-2 border-dashed border-neutral-200 text-center">
              <p className="text-sm text-neutral-400 mb-2">Nenhuma turma</p>
              <Link href="/turmas" className="text-xs font-bold text-indigo-500">Cadastrar agora →</Link>
            </div>
          )}
        </div>

        {/* Navegação */}
        <div>
          <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3">Navegação</p>
          <div className="space-y-1">
            {[
              { href: '/turmas',    icon: '👥', label: 'Gerenciar Turmas' },
              { href: '/historico', icon: '📋', label: 'Histórico' },
            ].map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
              >
                <span>{item.icon}</span>
                <span className="font-medium">{item.label}</span>
                <svg className="ml-auto" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </Link>
            ))}
          </div>
        </div>

        {/* Histórico recente */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Últimos atendimentos</p>
            <Link href="/historico" className="text-xs font-bold text-indigo-500 hover:text-indigo-700">Ver todos</Link>
          </div>
          {history.length === 0 ? (
            <p className="text-xs text-neutral-400 italic text-center py-4">Nenhum registro ainda.</p>
          ) : (
            <div className="space-y-2">
              {history.map((item: any) => (
                <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-colors">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0"
                    style={{ backgroundColor: item.helpAcionado ? '#FEE2E2' : '#DCFCE7' }}>
                    {item.helpAcionado ? '🚨' : '✅'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-neutral-700 truncate">Atendimento</p>
                    <p className="text-xs text-neutral-400">
                      {new Date(item.data).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                    </p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${item.helpAcionado ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                    {item.helpAcionado ? 'Socorro' : 'OK'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="text-center text-xs text-neutral-300 pt-2">Sala Funcionando &copy; 2026</p>
      </aside>
    </div>
  )
}
