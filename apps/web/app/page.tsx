import { Button } from '@sala-funcionando/ui'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <header className="p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="text-2xl font-bold text-[#1E293B] flex items-center gap-2">
          <span className="text-3xl">🧩</span>
          <span>Sala Funcionando</span>
        </div>
        <div className="flex gap-4">
          <Link href="/login">
            <Button variant="ghost">Entrar</Button>
          </Link>
          <Link href="/register">
            <Button variant="primary">Começar agora</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-4xl mx-auto space-y-12">
        <div className="space-y-6">
          <h1 className="text-5xl sm:text-7xl font-extrabold text-[#1E293B] leading-tight">
            Seu braço direito na <br />
            <span className="text-[#4F46E5]">Inclusão Escolar</span>
          </h1>
          <p className="text-xl text-[#64748B] max-w-2xl mx-auto">
            Apoio imediato, protocolos baseados em evidências e memória de sala para professores transformarem desafios em aprendizado.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link href="/register" className="w-full sm:w-auto">
            <Button variant="primary" className="w-full py-6 text-xl px-12 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              Criar minha conta gratuita
            </Button>
          </Link>
          <Link href="/login" className="w-full sm:w-auto">
            <Button variant="secondary" className="w-full py-6 text-xl px-12 rounded-2xl">
              Acessar plataforma
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12">
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="font-bold text-lg mb-2">Protocolos Imediatos</h3>
            <p className="text-sm text-slate-500">Orientações passo a passo para lidar com crises e comportamentos desafiadores.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="text-3xl mb-4">🧠</div>
            <h3 className="font-bold text-lg mb-2">Memória de Sala</h3>
            <p className="text-sm text-slate-500">O sistema aprende o que funciona melhor para cada uma de suas turmas.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="font-bold text-lg mb-2">Histórico & Dados</h3>
            <p className="text-sm text-slate-500">Acompanhe a evolução dos atendimentos e gere relatórios com facilidade.</p>
          </div>
        </div>
      </main>

      <footer className="p-12 text-center text-slate-400 text-sm">
        <p>&copy; 2026 Sala Funcionando. Feito para educadores, por quem entende de educação.</p>
      </footer>
    </div>
  )
}
