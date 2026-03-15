import { Button } from '@sala-funcionando/ui'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-[#F8FAFC]">
      <div className="bg-white p-12 rounded-3xl shadow-xl max-w-md w-full space-y-6">
        <div className="text-6xl">🔍</div>
        <h1 className="text-2xl font-bold text-slate-900">Página não encontrada</h1>
        <p className="text-slate-500">
          O link que você seguiu pode estar quebrado ou a página pode ter sido removida.
        </p>
        <Link href="/">
          <Button variant="primary" fullWidth className="mt-4">
            Voltar para o início
          </Button>
        </Link>
      </div>
    </div>
  )
}
