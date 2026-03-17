import Link from 'next/link'

const CONDITIONS = [
  { label: 'TEA',              icon: '🧩', color: '#2196F3' },
  { label: 'Dislexia',         icon: '🧠', color: '#E8A87C' },
  { label: 'Altas Habilidades',icon: '🌟', color: '#9C27B0' },
  { label: 'TDAH',             icon: '🚀', color: '#8BC34A' },
  { label: 'D.I. Leve',        icon: '💜', color: '#26C6DA' },
]

const FEATURES = [
  {
    icon: '⚡',
    color: '#EEF2FF',
    accent: '#4F46E5',
    title: 'Protocolos Imediatos',
    description: 'Orientações passo a passo baseadas em evidências para lidar com crises, transições e comportamentos desafiadores — na hora que você mais precisa.',
  },
  {
    icon: '💡',
    color: '#FFF7ED',
    accent: '#EA580C',
    title: 'Memória de Sala',
    description: 'O sistema aprende o que funciona melhor para cada uma das suas turmas, oferecendo sugestões cada vez mais precisas ao longo do tempo.',
  },
  {
    icon: '📊',
    color: '#F0FDF4',
    accent: '#16A34A',
    title: 'Histórico & Evolução',
    description: 'Registre cada atendimento e acompanhe a evolução da sua turma com dados reais, sem burocracia.',
  },
]

const STEPS = [
  { n: '01', title: 'Identifique a condição', description: 'Selecione a condição do aluno entre as categorias disponíveis.' },
  { n: '02', title: 'Siga o protocolo', description: 'Orientações claras e objetivas, passo a passo, para o momento de crise.' },
  { n: '03', title: 'Registre e aprenda', description: 'Salve o atendimento e construa a memória coletiva da sua sala.' },
]

export default function LandingPage() {
  return (
    <div style={{ backgroundColor: '#FAFAF8', fontFamily: 'var(--font-sans, system-ui, sans-serif)' }} className="min-h-screen flex flex-col">

      {/* ══ NAV ══ */}
      <header className="sticky top-0 z-50 border-b border-white/10" style={{ backgroundColor: 'rgba(30,31,59,0.97)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-lg">🧩</div>
            <span className="text-white font-bold text-sm tracking-wide">Sala Funcionando</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {['Funcionalidades', 'Como funciona', 'Condições'].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-white/55 hover:text-white text-sm font-medium transition-colors">
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login"
              className="text-white/70 hover:text-white text-sm font-semibold transition-colors px-3 py-1.5">
              Entrar
            </Link>
            <Link href="/register"
              className="text-sm font-bold px-4 py-2 rounded-xl transition-all hover:opacity-90"
              style={{ backgroundColor: '#4F46E5', color: '#ffffff' }}>
              Começar grátis
            </Link>
          </div>
        </div>
      </header>

      {/* ══ HERO ══ */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(150deg, #0F0E2A 0%, #1E1F3B 40%, #2D2C6B 100%)', minHeight: '92vh' }}>

        {/* Decorative orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute rounded-full opacity-20" style={{ width: 600, height: 600, background: 'radial-gradient(circle, #4F46E5 0%, transparent 70%)', top: -200, right: -100 }} />
          <div className="absolute rounded-full opacity-10" style={{ width: 400, height: 400, background: 'radial-gradient(circle, #9C27B0 0%, transparent 70%)', bottom: -100, left: -80 }} />
          <div className="absolute rounded-full opacity-15" style={{ width: 300, height: 300, background: 'radial-gradient(circle, #2196F3 0%, transparent 70%)', top: '40%', left: '15%' }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 pt-28 pb-24 flex flex-col items-center text-center">

          {/* Eyebrow */}
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 mb-8"
            style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white/60 text-xs font-semibold tracking-widest uppercase">Para professores do ensino inclusivo</span>
          </div>

          {/* Headline */}
          <h1 className="font-extrabold leading-tight mb-6" style={{ fontSize: 'clamp(2.6rem, 6vw, 4.5rem)', color: '#ffffff', letterSpacing: '-0.02em' }}>
            O suporte que os professores<br />
            <span style={{ background: 'linear-gradient(90deg, #818CF8 0%, #C084FC 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              precisavam ter desde sempre
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-lg mb-10 max-w-2xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Protocolos baseados em evidências, memória de sala e histórico de atendimentos —
            tudo para que você aja com calma e confiança nos momentos mais desafiadores.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16 w-full justify-center">
            <Link href="/register"
              className="font-bold px-8 py-4 rounded-2xl text-base transition-all hover:opacity-90 hover:shadow-2xl shadow-indigo-900/40 shadow-lg"
              style={{ backgroundColor: '#4F46E5', color: '#ffffff', minWidth: 220 }}>
              Criar minha conta — é grátis
            </Link>
            <Link href="/login"
              className="font-semibold px-8 py-4 rounded-2xl text-base border transition-colors"
              style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.75)', backgroundColor: 'rgba(255,255,255,0.05)', minWidth: 180 }}>
              Já tenho conta →
            </Link>
          </div>

          {/* Conditions strip */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Condições cobertas
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {CONDITIONS.map(c => (
                <div key={c.label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold"
                  style={{ backgroundColor: c.color + '22', border: `1px solid ${c.color}44`, color: '#ffffff' }}>
                  <span>{c.icon}</span>
                  <span>{c.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #FAFAF8)' }} />
      </section>

      {/* ══ STATS BAR ══ */}
      <section className="border-y border-neutral-100" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-4xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            { value: '5+',    label: 'Condições cobertas' },
            { value: '30+',   label: 'Protocolos disponíveis' },
            { value: '100%',  label: 'Baseado em evidências' },
          ].map(stat => (
            <div key={stat.label}>
              <p className="text-4xl font-extrabold mb-1" style={{ color: '#1E1F3B' }}>{stat.value}</p>
              <p className="text-sm font-medium" style={{ color: '#94A3B8' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ FEATURES ══ */}
      <section id="funcionalidades" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#4F46E5' }}>Funcionalidades</p>
            <h2 className="text-4xl font-extrabold mb-4" style={{ color: '#1E1F3B', letterSpacing: '-0.02em' }}>
              Tudo que você precisa,<br />no momento que importa
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: '#64748B' }}>
              Desenvolvido com educadores especializados para ser simples, rápido e confiável.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map(f => (
              <div key={f.title}
                className="rounded-3xl p-8 border border-neutral-100 shadow-sm hover:shadow-lg transition-shadow"
                style={{ backgroundColor: '#ffffff' }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-6"
                  style={{ backgroundColor: f.color }}>
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#1E1F3B' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section id="como-funciona" className="py-24 px-6" style={{ backgroundColor: '#1E1F3B' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#818CF8' }}>Como funciona</p>
            <h2 className="text-4xl font-extrabold" style={{ color: '#ffffff', letterSpacing: '-0.02em' }}>
              Simples. Rápido. Eficaz.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connecting line (desktop only) */}
            <div className="hidden md:block absolute top-10 left-[calc(16.6%+1rem)] right-[calc(16.6%+1rem)] h-px"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />

            {STEPS.map((step, i) => (
              <div key={step.n} className="relative text-center px-4 py-8">
                <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center font-extrabold text-lg relative z-10"
                  style={{ backgroundColor: i === 0 ? '#4F46E5' : 'rgba(255,255,255,0.08)', color: i === 0 ? '#ffffff' : 'rgba(255,255,255,0.5)', border: i !== 0 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                  {step.n}
                </div>
                <h3 className="text-lg font-bold mb-3" style={{ color: '#ffffff' }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CONDITIONS ══ */}
      <section id="condições" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#4F46E5' }}>Condições cobertas</p>
            <h2 className="text-4xl font-extrabold mb-4" style={{ color: '#1E1F3B', letterSpacing: '-0.02em' }}>
              Cada aluno tem sua necessidade.<br />Nós temos o protocolo.
            </h2>
            <p className="text-lg max-w-lg mx-auto" style={{ color: '#64748B' }}>
              Protocolos específicos para as condições mais presentes nas salas de aula inclusivas do Brasil.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: 'Transtorno do Espectro Autista', short: 'TEA', icon: '🧩', color: '#2196F3', desc: 'Crises, transições, estereotipias, interação social e mais.' },
              { label: 'Dislexia',                        short: null,  icon: '🧠', color: '#E8A87C', desc: 'Estratégias para dificuldades de leitura, escrita e processamento.' },
              { label: 'Altas Habilidades',               short: 'AHSD',icon: '🌟', color: '#9C27B0', desc: 'Orientações para potencializar talentos e lidar com desafios emocionais.' },
              { label: 'TDAH',                            short: null,  icon: '🚀', color: '#8BC34A', desc: 'Suporte para atenção, impulsividade e regulação comportamental.' },
              { label: 'Deficiência Intelectual Leve',    short: 'D.I.',icon: '💜', color: '#26C6DA', desc: 'Protocolos de comunicação e adaptação de atividades.' },
            ].map((c, i) => (
              <div key={c.label}
                className={`rounded-2xl p-6 flex items-center gap-4 border hover:shadow-md transition-shadow ${i === 4 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
                style={{ backgroundColor: '#ffffff', borderColor: c.color + '33' }}>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ backgroundColor: c.color + '1A' }}>
                  {c.icon}
                </div>
                <div>
                  <p className="font-bold text-base" style={{ color: '#1E1F3B' }}>
                    {c.label} {c.short && <span className="font-normal text-sm" style={{ color: '#94A3B8' }}>· {c.short}</span>}
                  </p>
                  <p className="text-xs mt-1 leading-relaxed" style={{ color: '#94A3B8' }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ QUOTE ══ */}
      <section className="py-20 px-6" style={{ backgroundColor: '#F5F3FF' }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-5xl mb-6">🤝</div>
          <blockquote className="text-2xl font-semibold leading-relaxed mb-6" style={{ color: '#1E1F3B' }}>
            "Nenhum professor deveria estar sozinho em sala quando um aluno precisa de suporte especializado."
          </blockquote>
          <p className="text-sm font-medium" style={{ color: '#7C3AED' }}>Propósito do Sala Funcionando</p>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="relative overflow-hidden py-28 px-6" style={{ background: 'linear-gradient(150deg, #0F0E2A 0%, #1E1F3B 40%, #2D2C6B 100%)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute rounded-full opacity-20" style={{ width: 500, height: 500, background: 'radial-gradient(circle, #4F46E5 0%, transparent 70%)', top: -200, right: -100 }} />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-5" style={{ color: '#ffffff', letterSpacing: '-0.02em' }}>
            Pronto para transformar<br />sua sala de aula?
          </h2>
          <p className="text-lg mb-10" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Crie sua conta gratuita agora. Sem cartão de crédito, sem complicação.
          </p>
          <Link href="/register"
            className="inline-block font-bold px-10 py-4 rounded-2xl text-base transition-all hover:opacity-90 shadow-xl shadow-indigo-900/40"
            style={{ backgroundColor: '#4F46E5', color: '#ffffff' }}>
            Criar minha conta — é grátis
          </Link>
          <p className="mt-5 text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Já tem conta? <Link href="/login" className="underline hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.5)' }}>Entrar</Link>
          </p>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="border-t border-neutral-100 py-10 px-6" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center text-base">🧩</div>
            <span className="font-bold text-sm" style={{ color: '#1E1F3B' }}>Sala Funcionando</span>
          </div>
          <p className="text-xs text-center" style={{ color: '#CBD5E1' }}>
            &copy; 2026 Sala Funcionando · Feito para educadores, por quem entende de educação.
          </p>
          <div className="flex gap-5">
            <Link href="/login"    className="text-xs font-medium hover:text-neutral-900 transition-colors" style={{ color: '#94A3B8' }}>Entrar</Link>
            <Link href="/register" className="text-xs font-medium hover:text-neutral-900 transition-colors" style={{ color: '#94A3B8' }}>Criar conta</Link>
          </div>
        </div>
      </footer>

    </div>
  )
}
