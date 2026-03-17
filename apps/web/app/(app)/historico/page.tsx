import { getTurmasAction } from '@/lib/server-actions/turma.actions'
import { getHistoricoPorTurmaAction } from '@/lib/server-actions/historico.actions'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Button } from '@sala-funcionando/ui'
import Link from 'next/link'

export default async function HistoricoPage(props: {
  searchParams: Promise<{ turmaId?: string }>
}) {
  const searchParams = await props.searchParams
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return redirect('/login')

  const turmas = await getTurmasAction(user.id)
  const selectedTurmaId = searchParams.turmaId || (turmas.length > 0 ? turmas[0].id : null)
  const history = selectedTurmaId ? await getHistoricoPorTurmaAction(selectedTurmaId) : []

  return (
    <div style={{ backgroundColor: '#F0F2F5' }} className="min-h-full px-4 py-6 lg:px-8 lg:py-8">

      {/* Header banner */}
      <div
        className="relative rounded-2xl px-6 py-6 mb-6 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1E1F3B 0%, #3730A3 100%)' }}
      >
        <div className="relative z-10">
          <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-1">Registros</p>
          <h1 className="text-white text-xl font-bold mb-1">Histórico de Atendimentos</h1>
          <p className="text-indigo-300 text-sm">Acompanhe os protocolos aplicados e a evolução de cada turma.</p>
        </div>
        <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full opacity-10 bg-indigo-400" />
        <div className="absolute -right-2 bottom-0 w-20 h-20 rounded-full opacity-10 bg-indigo-200" />
      </div>

      {/* Turma filter */}
      {turmas.length > 0 && (
        <div className="mb-5">
          <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3">Filtrar por Turma</p>
          <div className="flex flex-wrap gap-2">
            {turmas.map((turma) => (
              <Link
                key={turma.id}
                href={`/historico?turmaId=${turma.id}`}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  selectedTurmaId === turma.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-white text-neutral-600 border border-neutral-200 hover:border-indigo-300 hover:text-indigo-700'
                }`}
              >
                {turma.nome}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* History list */}
      {!selectedTurmaId ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-neutral-100 shadow-sm">
          <p className="text-neutral-400">Nenhuma turma selecionada ou cadastrada.</p>
        </div>
      ) : history.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-neutral-100 shadow-sm space-y-4">
          <p className="text-neutral-400 italic">Nenhum atendimento registrado para esta turma ainda.</p>
          <Link href="/dashboard">
            <Button variant="ghost">Começar atendimento</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((item: any) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl px-5 py-4 border border-neutral-100 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all flex items-center gap-4"
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ backgroundColor: item.helpAcionado ? '#FEE2E2' : '#DCFCE7' }}
              >
                {item.helpAcionado ? '🚨' : '✅'}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-neutral-900 text-sm">Protocolo TEA / Crise</p>
                <p className="text-xs text-neutral-400 mt-0.5">
                  {new Date(item.data).toLocaleDateString('pt-BR', {
                    day: '2-digit', month: 'long', year: 'numeric',
                    hour: '2-digit', minute: '2-digit',
                  })}
                </p>
              </div>

              {/* Badge */}
              <span
                className={`text-xs font-bold px-3 py-1.5 rounded-full flex-shrink-0 ${
                  item.helpAcionado
                    ? 'bg-red-50 text-red-600'
                    : 'bg-green-50 text-green-700'
                }`}
              >
                {item.helpAcionado ? 'Socorro Acionado' : 'Concluído'}
              </span>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}
