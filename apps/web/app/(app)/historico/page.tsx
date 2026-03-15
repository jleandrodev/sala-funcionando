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

  if (!user) {
    return redirect('/login')
  }

  const turmas = await getTurmasAction(user.id)
  const selectedTurmaId = searchParams.turmaId || (turmas.length > 0 ? turmas[0].id : null)
  
  const history = selectedTurmaId 
    ? await getHistoricoPorTurmaAction(selectedTurmaId)
    : []

  return (
    <main className="p-6 sm:p-12">
      <div className="max-w-5xl mx-auto space-y-12">
        <header>
          <h1 className="text-4xl font-bold text-slate-900 shadow-none border-none!">Histórico de Atendimentos</h1>
          <p className="text-slate-500">Acompanhe os protocolos aplicados e a evolução de cada turma.</p>
        </header>

        <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="w-full sm:w-auto">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Filtrar por Turma</label>
              <div className="flex gap-2">
                {turmas.map((turma) => (
                  <Link 
                    key={turma.id} 
                    href={`/historico?turmaId=${turma.id}`}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                      selectedTurmaId === turma.id 
                        ? 'bg-brand-600 text-white shadow-lg shadow-brand-100' 
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {turma.nome}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {!selectedTurmaId ? (
            <div className="text-center py-12">
              <p className="text-slate-400">Nenhuma turma selecionada ou cadastrada.</p>
            </div>
          ) : history.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-400 italic">Nenhum atendimento registrado para esta turma ainda.</p>
              <Link href="/dashboard">
                <Button variant="ghost" className="mt-4">Começar atendimento</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((item: any) => (
                <div key={item.id} className="flex items-center justify-between p-6 rounded-2xl border border-slate-100 hover:border-brand-200 transition-all">
                  <div className="flex items-center gap-6">
                    <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center text-2xl">
                       {item.helpAcionado ? '🚨' : '✅'}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Protocolo TEA / Crise</h3>
                      <p className="text-sm text-slate-500">
                        {new Date(item.data).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      item.helpAcionado 
                        ? 'bg-danger-50 text-danger-700' 
                        : 'bg-success-50 text-success-700'
                    }`}>
                      {item.helpAcionado ? 'Socorro Acionado' : 'Concluído'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
