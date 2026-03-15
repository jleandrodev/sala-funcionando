'use client'

import React, { useState, useEffect } from 'react';
import { Button } from './Button';

export const ConsentBanner: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('lgpd-consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('lgpd-consent', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 z-[100] animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 max-w-6xl mx-auto">
        <div className="space-y-1 text-center md:text-left">
          <p className="font-bold text-slate-900 dark:text-white">Privacidade & LGPD</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Utilizamos dados de forma ética para melhorar o auxílio em sala. Ao continuar, você concorda com nossa <a href="/privacy" className="underline hover:text-brand-600">Política de Privacidade</a>.
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="ghost" size="sm" onClick={handleAccept} className="flex-1 md:flex-none">Recusar</Button>
          <Button variant="primary" size="sm" onClick={handleAccept} className="flex-1 md:flex-none">Aceitar e Continuar</Button>
        </div>
      </div>
    </div>
  );
};
