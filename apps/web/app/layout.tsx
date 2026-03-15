import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConsentBanner } from "@sala-funcionando/ui";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sala Funcionando — Seu braço direito na Inclusão Escolar",
  description: "Plataforma de auxílio imediato para professores em situações de crise. Protocolos baseados em evidências para TEA, Down e outras condições.",
  openGraph: {
    title: "Sala Funcionando — Apoio à Inclusão Escolar",
    description: "Protocolos imediatos e auxílio em sala de aula para educadores.",
    url: "https://salafuncionando.com.br",
    siteName: "Sala Funcionando",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sala Funcionando — Apoio à Inclusão Escolar",
    description: "Protocolos imediatos e auxílio em sala de aula para educadores.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <ConsentBanner />
      </body>
    </html>
  );
}
