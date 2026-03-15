'use client'

import { useEffect } from 'react'
import { Button } from '@sala-funcionando/ui'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-[#F8FAFC]">
      <div className="bg-white p-12 rounded-3xl shadow-xl max-w-md w-full space-y-6">
        <div className="text-6xl">🤕</div>
        <h1 className="text-2xl font-bold text-slate-900 border-none!">Algo deu errado</h1>
        <p className="text-slate-500">
          Ocorreu um erro inesperado. Por favor, tente novamente ou volte para o início.
        </p>
        <div className="flex flex-col gap-3">
          <Button onClick={() => reset()} variant="primary" fullWidth>
            Tentar novamente
          </Button>
          <Button onClick={() => window.location.href = '/'} variant="ghost" fullWidth>
            Voltar para o início
          </Button>
        </div>
        {process.env.NODE_ENV === 'development' && (
          <pre className="text-left text-xs bg-slate-50 p-4 rounded-lg overflow-auto max-h-40">
            {error.message}
          </pre>
        )}
      </div>
    </div>
  )
}
