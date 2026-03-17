'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface AppShellProps {
  children: React.ReactNode
  userName: string
  userEmail: string
  userInitials: string
  userAvatar?: string
  signOutAction: () => Promise<void>
}

const NAV_ITEMS = [
  {
    href: '/dashboard',
    label: 'Intercorrência',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
  },
  {
    href: '/turmas',
    label: 'Turmas',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    href: '/historico',
    label: 'Histórico',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
]

function Avatar({ src, initials, size = 9 }: { src?: string; initials: string; size?: number }) {
  const cls = `w-${size} h-${size} rounded-full bg-indigo-400 flex items-center justify-center text-white font-bold overflow-hidden flex-shrink-0`
  return (
    <div className={cls} style={{ width: `${size * 4}px`, height: `${size * 4}px`, fontSize: `${size * 1.5}px` }}>
      {src ? <img src={src} alt={initials} className="w-full h-full object-cover" /> : initials}
    </div>
  )
}

export function AppShell({ children, userName, userEmail, userInitials, userAvatar, signOutAction }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => { setSidebarOpen(false) }, [pathname])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setSidebarOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  const firstName = userName.split(' ')[0]

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: '#F0F2F5' }}>

      {/* ── Mobile overlay ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ══════════════ SIDEBAR ══════════════ */}
      <aside
        className={[
          'fixed top-0 left-0 h-full z-40 flex flex-col transition-transform duration-300 ease-in-out',
          'lg:static lg:translate-x-0 lg:z-auto lg:flex-shrink-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        ].join(' ')}
        style={{ width: '220px', backgroundColor: '#1E1F3B' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 h-16 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-lg flex-shrink-0">🧩</div>
          <span className="text-white font-bold text-sm tracking-wide leading-tight">Sala Funcionando</span>
          <button
            className="ml-auto text-white/40 hover:text-white lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Fechar menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors',
                  active
                    ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-900/40'
                    : 'text-white/50 hover:bg-white/8 hover:text-white/90',
                ].join(' ')}
              >
                <span className={active ? 'text-white' : 'text-white/40'}>{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* User */}
        <div className="px-4 py-4 border-t border-white/8 flex-shrink-0">
          <div className="flex items-center gap-3">
            <Avatar src={userAvatar} initials={userInitials} size={9} />
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-semibold truncate">{userName}</p>
              <p className="text-white/35 text-xs truncate">{userEmail}</p>
            </div>
            <form action={signOutAction}>
              <button type="submit" title="Sair" className="text-white/30 hover:text-red-400 transition-colors" aria-label="Sair">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* ══════════════ MAIN AREA ══════════════ */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* ── Mobile header ── */}
        <header
          className="lg:hidden sticky top-0 z-20 flex items-center gap-3 px-4 h-14 flex-shrink-0 shadow-sm"
          style={{ backgroundColor: '#1E1F3B' }}
        >
          <button onClick={() => setSidebarOpen(true)} aria-label="Abrir menu" className="text-white/70 hover:text-white p-1">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <span className="text-white font-bold text-sm flex-1">Prof. {firstName}</span>
          <Avatar src={userAvatar} initials={userInitials} size={8} />
        </header>

        {/* ── Desktop top bar ── */}
        <div className="hidden lg:flex items-center gap-4 px-6 h-16 bg-white border-b border-neutral-100 flex-shrink-0 shadow-sm">
          {/* Search */}
          <div className="flex-1 max-w-sm">
            <div className="flex items-center gap-2 bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                placeholder="Buscar protocolo..."
                className="bg-transparent text-sm text-neutral-600 placeholder:text-neutral-400 focus:outline-none w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {/* Help */}
            <button className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500 transition-colors" title="Ajuda">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </button>
            {/* Notifications */}
            <button className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500 transition-colors relative" title="Notificações">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
            </button>

            {/* Divider */}
            <div className="w-px h-6 bg-neutral-200" />

            {/* User */}
            <div className="flex items-center gap-2.5">
              <Avatar src={userAvatar} initials={userInitials} size={9} />
              <div className="hidden xl:block">
                <p className="text-sm font-semibold text-neutral-800 leading-tight">{firstName}</p>
                <p className="text-xs text-neutral-400 leading-tight">Professor(a)</p>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
          </div>
        </div>

        {/* ── Page content ── */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
