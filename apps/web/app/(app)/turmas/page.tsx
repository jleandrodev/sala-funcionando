import { getTurmasAction, createTurmaAction } from '@/lib/server-actions/turma.actions'
import { Button, FormField } from '@sala-funcionando/ui'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function TurmasPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  const turmas = await getTurmasAction(user.id)

  async function handleSubmit(formData: FormData) {
    'use server'
    
    const supabaseAction = await createClient()
    const { data: { user } } = await supabaseAction.auth.getUser()

    if (!user) return

    const data = {
      professorId: user.id,
      nome: formData.get('nome') as string,
      faixaEtaria: formData.get('faixaEtaria') as string,
      tamanho: parseInt(formData.get('tamanho') as string),
      alunosNEE: parseInt(formData.get('alunosNEE') as string) || 0,
    }

    await createTurmaAction(data)
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] p-6 sm:p-12">
      <div className="max-w-5xl mx-auto space-y-12">
        <header className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <Link href="/dashboard" className="text-brand-600 hover:underline mb-2 block text-sm font-medium">
              &larr; Voltar para o Dashboard
            </Link>
            <h1 className="text-4xl font-bold text-slate-900">Suas Turmas</h1>
            <p className="text-slate-500">Gerencie seus grupos de alunos e acompanhe o progresso.</p>
          </div>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <section className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-semibold text-slate-800">Turmas Ativas</h2>
            {turmas.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl border border-dashed border-slate-200 text-center">
                <p className="text-slate-400">Nenhuma turma cadastrada ainda.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {turmas.map((turma) => (
                  <div key={turma.id} className="group bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{turma.nome}</h3>
                    <p className="text-slate-500 text-sm mb-6">
                      {turma.faixaEtaria} • {turma.tamanho} alunos ({turma.alunosNEE} NEE)
                    </p>
                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm" className="flex-1 rounded-xl">Editar</Button>
                      <Button variant="ghost" size="sm" className="flex-1 rounded-xl">Histórico</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm sticky top-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">Cadastrar Nova Turma</h2>
              <form action={handleSubmit} className="space-y-4">
                <FormField 
                  label="Nome da Turma" 
                  name="nome" 
                  placeholder="Ex: 3º Ano B - Manhã" 
                  required 
                />
                <FormField 
                  label="Faixa Etária" 
                  name="faixaEtaria" 
                  placeholder="Ex: 7-8 anos" 
                  required 
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField 
                    label="Total Alunos" 
                    name="tamanho" 
                    type="number" 
                    min="1" 
                    required 
                  />
                  <FormField 
                    label="Alunos NEE" 
                    name="alunosNEE" 
                    type="number" 
                    min="0" 
                  />
                </div>
                <Button type="submit" variant="primary" fullWidth className="py-4 mt-4">
                  Adicionar Turma
                </Button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
