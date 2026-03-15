import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'
import path from 'path'

// Carrega .env da raiz do projeto
dotenv.config({ path: path.join(__dirname, '../../../.env') })

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Deletando protocolos antigos...')
  await prisma.etapaProtocolo.deleteMany()
  await prisma.protocolo.deleteMany()

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
        },
        {
          ordem: 4,
          instrucao: 'Ofereça um item de conforto ou autorregulação se disponível (ex: fone abafador).',
          oQueEvitar: 'Não tente forçar o uso do item.',
          frasesProntas: ['Quer seu fone?', 'Aqui está seu mordedor.']
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
        },
        {
          ordem: 2,
          instrucao: 'Dê avisos temporais claros antes da mudança (5 minutos, 1 minuto).',
          oQueEvitar: 'Não grite os avisos de longe; aproxime-se do aluno.',
          frasesProntas: ['Faltam 5 minutos.', 'Está quase acabando.']
        },
        {
          ordem: 3,
          instrucao: 'Permita que o aluno leve um objeto de transição para o próximo ambiente.',
          oQueEvitar: 'Não tire objetos das mãos do aluno abruptamente.',
          frasesProntas: ['Pode levar seu carrinho.', 'Vamos levar o livro?']
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
        },
        {
          ordem: 2,
          instrucao: 'Use interesses específicos do aluno como ponte para a interação.',
          oQueEvitar: 'Não critique a forma como o aluno brinca ou interage.',
          frasesProntas: ['Eu também gosto de dinossauros!', 'Onde o trem vai agora?']
        },
        {
          ordem: 3,
          instrucao: 'Modele a interação social de forma simples e direta.',
          oQueEvitar: 'Não use sarcasmo ou figuras de linguagem complexas.',
          frasesProntas: ['Sua vez, minha vez.', 'Oi, posso entrar?']
        }
      ]
    },
    {
      subSituacao: 'ESTEREOTIPIA',
      etapas: [
        {
          ordem: 1,
          instrucao: 'Observe a função da estereotipia (é busca sensorial? é estresse?).',
          oQueEvitar: 'Não tente impedir a estereotipia se ela não for perigosa.',
          frasesProntas: ['Gosta de balançar?', 'Mãos agitadas.']
        },
        {
          ordem: 2,
          instrucao: 'Se a estereotipia interferir na tarefa, tente redirecionar para uma atividade funcional similar.',
          oQueEvitar: 'Não dê broncas ou chame a atenção de forma negativa.',
          frasesProntas: ['Vamos apertar a massinha?', 'Siga meu dedo.']
        }
      ]
    },
    {
      subSituacao: 'AGRESSIVIDADE',
      etapas: [
        {
          ordem: 1,
          instrucao: 'Mantenha uma distância segura e retire objetos passíveis de serem arremessados.',
          oQueEvitar: 'Não responda com agressividade ou tom de voz elevado.',
          frasesProntas: ['Mãos calmas.', 'Eu te ajudo a ficar calmo.']
        },
        {
          ordem: 2,
          instrucao: 'Identifique o gatilho imediato (dor? frustração? sede?).',
          oQueEvitar: 'Não tente punir o aluno durante o episódio de agressividade.',
          frasesProntas: ['Quer água?', 'Onde dói?']
        },
        {
          ordem: 3,
          instrucao: 'Se necessário, use técnicas de contenção segura apenas conforme treinamento e última instância.',
          oQueEvitar: 'Nunca use força desproporcional.',
          frasesProntas: ['Vou te segurar para te proteger.', 'Calma.']
        }
      ]
    },
    {
      subSituacao: 'FUGA',
      etapas: [
        {
          ordem: 1,
          instrucao: 'Bloqueie a rota de saída de forma gentil se houver risco de segurança.',
          oQueEvitar: 'Não corra atrás do aluno se o ambiente for seguro, pois pode virar uma brincadeira de perseguição.',
          frasesProntas: ['Fique aqui.', 'Porta fechada.']
        },
        {
          ordem: 2,
          instrucao: 'Tente atrair o aluno de volta com um reforçador positivo potente.',
          oQueEvitar: 'Não prometa coisas que não pode cumprir.',
          frasesProntas: ['Olha o que eu tenho aqui!', 'Vamos ver o vídeo?']
        }
      ]
    },
    {
      subSituacao: 'ALIMENTACAO',
      etapas: [
        {
          ordem: 1,
          instrucao: 'Apresente novos alimentos de forma gradual (apenas cheirar, depois tocar).',
          oQueEvitar: 'Não force o aluno a comer ou coloque comida na boca dele.',
          frasesProntas: ['Só olha.', 'Pode cheirar.']
        },
        {
          ordem: 2,
          instrucao: 'Respeite seletividades de textura ou cor.',
          oQueEvitar: 'Não esconda alimentos "novos" dentro dos favoritos.',
          frasesProntas: ['Este é crocante.', 'Laranja como a cenoura.']
        }
      ]
    }
  ]

  for (const p of protocolosTEA) {
    const protocolo = await prisma.protocolo.create({
      data: {
        condicao: 'TEA',
        subSituacao: p.subSituacao,
        versao: 1,
        etapas: {
          create: p.etapas
        }
      }
    })
    console.log(`✅ Protocolo TEA - ${p.subSituacao} criado com ${p.etapas.length} etapas.`)
  }

  console.log('✨ Seed finalizado com sucesso!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
