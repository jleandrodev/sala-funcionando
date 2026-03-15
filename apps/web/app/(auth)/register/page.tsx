import { Button, FormField, AlertBanner } from '@sala-funcionando/ui'
import { signup } from '@/lib/server-actions/auth.actions'
import Link from 'next/link'

export default async function RegisterPage(props: {
  searchParams: Promise<{ message: string }>
}) {
  const searchParams = await props.searchParams
  return (
    <div className="flex flex-col items-center justify-center min-vh-100 p-6 bg-[#F8FAFC]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1E293B] mb-2">Criar Conta</h1>
          <p className="text-[#64748B]">Comece a transformar sua sala de aula hoje mesmo.</p>
        </div>

        {searchParams?.message && (
          <div className="mb-6">
            <AlertBanner type="info" message={searchParams.message} title="Aviso" />
          </div>
        )}

        <form action={signup} className="space-y-6">
          <FormField
            label="Nome Completo"
            name="name"
            type="text"
            placeholder="Seu nome"
            required
          />
          <FormField
            label="E-mail"
            name="email"
            type="email"
            placeholder="seu@email.com"
            required
          />
          <FormField
            label="Senha"
            name="password"
            type="password"
            placeholder="••••••••"
            required
          />

          <Button type="submit" variant="primary" className="w-full py-4 text-lg">
            Criar conta
          </Button>
        </form>

        <div className="mt-8 text-center text-[#64748B]">
          <span>Já tem uma conta? </span>
          <Link href="/login" className="text-[#4F46E5] font-semibold hover:underline">
            Entre aqui
          </Link>
        </div>
      </div>
    </div>
  )
}
