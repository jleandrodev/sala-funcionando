import { Button, FormField, AlertBanner } from '@sala-funcionando/ui'
import { login } from '@/lib/server-actions/auth.actions'
import Link from 'next/link'

export default async function LoginPage(props: {
  searchParams: Promise<{ message: string }>
}) {
  const searchParams = await props.searchParams
  return (
    <div className="flex flex-col items-center justify-center min-vh-100 p-6 bg-[#F8FAFC]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1E293B] mb-2">Bem-vindo</h1>
          <p className="text-[#64748B]">Entre na sua conta para gerenciar suas turmas e protocolos.</p>
        </div>

        {searchParams?.message && (
          <div className="mb-6">
            <AlertBanner type="error" message={searchParams.message} title="Erro" />
          </div>
        )}

        <form action={login} className="space-y-6">
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
            Entrar
          </Button>
        </form>

        <div className="mt-8 text-center text-[#64748B]">
          <span>Não tem uma conta? </span>
          <Link href="/register" className="text-[#4F46E5] font-semibold hover:underline">
            Cadastre-se
          </Link>
        </div>
      </div>
    </div>
  )
}
