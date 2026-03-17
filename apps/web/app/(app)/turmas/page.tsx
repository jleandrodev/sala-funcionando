import { getTurmasAction, createTurmaAction } from '@/lib/server-actions/turma.actions'
import { Button, FormField } from '@sala-funcionando/ui'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function TurmasPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return redirect('/login')

  const turmas = await getTurmasAction(user.id)

  async function handleSubmit(formData: FormData) {
    'use server'
    const supabaseAction = await createClient()
    const { data: { user } } = await supabaseAction.auth.getUser()
    if (!user) return
    await createTurmaAction({
      professorId: user.id,
      nome: formData.get('nome') as string,
      faixaEtaria: formData.get('faixaEtaria') as string,
      tamanho: parseInt(formData.get('tamanho') as string),
      alunosNEE: parseInt(formData.get('alunosNEE') as string) || 0,
    })
  }

  return (
    <div style={{ backgroundColor: '#F0F2F5' }} className="min-h-full px-4 py-6 lg:px-8 lg:py-8">

      {/* Header banner */}
      <div
        className="relative rounded-2xl px-6 py-6 mb-6 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1E1F3B 0%, #3730A3 100%)' }}
      >
        <div className="relative z-10">
          <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-1">Gestão</p>
          <h1 className="text-white text-xl font-bold mb-1">Suas Turmas</h1>
          <p className="text-indigo-300 text-sm">Gerencie seus grupos de alunos e acompanhe o progresso.</p>
        </div>
        <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full opacity-10 bg-indigo-400" />
        <div className="absolute -right-2 bottom-0 w-20 h-20 rounded-full opacity-10 bg-indigo-200" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Turmas list */}
        <section className="lg:col-span-2 space-y-4">
          <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Turmas Ativas</p>

          {turmas.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 border-2 border-dashed border-neutral-200 text-center shadow-sm">
              <p className="text-neutral-400 mb-2">Nenhuma turma cadastrada ainda.</p>
              <p className="text-sm text-neutral-400">Use o formulário ao lado para adicionar a primeira.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {turmas.map((turma) => (
                <div
                  key={turma.id}
                  className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-base font-bold text-neutral-900">{turma.nome}</h3>
                      <p className="text-sm text-neutral-400 mt-0.5">{turma.faixaEtaria}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-xl flex-shrink-0">👥</div>
                  </div>

                  <div className="flex gap-3 py-3 border-t border-neutral-100 mb-4">
                    <div className="flex-1 text-center">
                      <p className="text-xl font-bold text-indigo-700">{turma.tamanho}</p>
                      <p className="text-xs text-neutral-400">Alunos</p>
                    </div>
                    <div className="w-px bg-neutral-100" />
                    <div className="flex-1 text-center">
                      <p className="text-xl font-bold text-indigo-700">{turma.alunosNEE}</p>
                      <p className="text-xs text-neutral-400">NEE</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm" className="flex-1 rounded-xl">Editar</Button>
                    <Link href={`/historico?turmaId=${turma.id}`} className="flex-1">
                      <Button variant="ghost" size="sm" className="w-full rounded-xl">Histórico</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Create form */}
        <section>
          <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm sticky top-6">
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-5">Cadastrar Nova Turma</p>
            <form action={handleSubmit} className="space-y-4">
              <FormField
                label="Nome da Turma"
                name="nome"
                placeholder="Ex: 3º Ano B – Manhã"
                required
              />
              <FormField
                label="Faixa Etária"
                name="faixaEtaria"
                placeholder="Ex: 7–8 anos"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Total Alunos" name="tamanho" type="number" min="1" required />
                <FormField label="Alunos NEE"   name="alunosNEE" type="number" min="0" />
              </div>
              <Button type="submit" variant="primary" fullWidth className="py-4 mt-2">
                Adicionar Turma
              </Button>
            </form>
          </div>
        </section>

      </div>
    </div>
  )
}
