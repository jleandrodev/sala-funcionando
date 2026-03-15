import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'
import path from 'path'

// Carrega .env da raiz do projeto
dotenv.config({ path: path.join(__dirname, '../../../.env') })

// Força o uso da DIRECT_URL para evitar problemas de timeout do pooler durante o seed
if (!process.env.DIRECT_URL) {
  console.error('❌ Erro: DIRECT_URL não encontrada no arquivo .env')
  process.exit(1)
}

process.env.DATABASE_URL = process.env.DIRECT_URL

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL,
    },
  },
})

async function main() {
  console.log('🚀 Iniciando script de população do banco...')
  
  try {
    console.log('🔗 Conectando ao banco (via DIRECT_URL)...')
    await prisma.$connect()
    console.log('✅ Conectado!')

    console.log('🧹 Limpando dados antigos...')
    await prisma.etapaProtocolo.deleteMany()
    await prisma.protocolo.deleteMany()
    console.log('✅ Banco limpo.')

    const protocolosTEA = [
      {
        subSituacao: 'CRISE',
        etapas: [
          {
            ordem: 1,
            instrucao: 'Garanta a segurança física do aluno e dos outros. Afaste objetos perigosos.',
            oQueEvitar: 'Não tente segurar o aluno à força, a menos que haja risco iminente de autolesão.',
            frasesProntas: ['Eu estou aqui com você.', 'Você está seguro agora.']
          },
          {
            ordem: 2,
            instrucao: 'Reduza estímulos sensoriais. Apague luzes fortes e diminua o barulho ao redor.',
            oQueEvitar: 'Não faça perguntas complexas ou dê muitas instruções ao mesmo tempo.',
            frasesProntas: ['Vamos respirar juntos.', 'Silêncio agora.']
          },
          {
            ordem: 3,
            instrucao: 'Mantenha-se calmo e use poucas palavras. Sua linguagem corporal deve ser neutra.',
            oQueEvitar: 'Evite contato visual direto prolongado se isso parecer irritar o aluno.',
            frasesProntas: ['Estou te esperando.', 'No seu tempo.']
          }
        ]
      },
      {
        subSituacao: 'TRANSICAO',
        etapas: [
          {
            ordem: 1,
            instrucao: 'Utilize apoios visuais para mostrar o que virá a seguir (ex: cartões agora/depois).',
            oQueEvitar: 'Não mude a atividade bruscamente sem aviso prévio.',
            frasesProntas: ['Agora atividade, depois parque.', 'Veja a rotina.']
          }
        ]
      },
      {
        subSituacao: 'INTERACAO_SOCIAL',
        etapas: [
          {
            ordem: 1,
            instrucao: 'Respeite o espaço pessoal do aluno. Não force interações físicas.',
            oQueEvitar: 'Não force o aluno a olhar nos olhos.',
            frasesProntas: ['Estou sentado aqui perto.', 'Quer brincar do seu jeito?']
          }
        ]
      }
    ]

    for (const p of protocolosTEA) {
      await prisma.protocolo.create({
        data: {
          condicao: 'TEA',
          subSituacao: p.subSituacao,
          versao: 1,
          etapas: {
            create: p.etapas
          }
        }
      })
      console.log(`📌 Protocolo TEA - ${p.subSituacao} criado.`)
    }

    console.log('✨ Banco de dados populado com sucesso!')
  } catch (error) {
    console.error('❌ Erro ao popular o banco:')
    console.error(error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
