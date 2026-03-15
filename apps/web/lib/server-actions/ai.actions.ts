'use server'

import { AdaptProtocoloUseCase } from '@sala-funcionando/application'
import { PrismaProtocoloRepository, PrismaTurmaRepository, MockAIAdapter } from '@sala-funcionando/infrastructure'

const protocoloRepository = new PrismaProtocoloRepository()
const turmaRepository = new PrismaTurmaRepository()
const aiAdapter = new MockAIAdapter()

const adaptProtocoloUseCase = new AdaptProtocoloUseCase(aiAdapter, turmaRepository, protocoloRepository)

export async function adaptProtocoloAction(protocoloId: string, turmaId: string) {
  try {
    const protocolo = await adaptProtocoloUseCase.execute(protocoloId, turmaId)
    
    return {
      success: true,
      protocolo: {
        id: protocolo.id,
        condicao: protocolo.condicao,
        subSituacao: protocolo.subSituacao,
        etapas: protocolo.etapas.map(e => ({
          id: e.id,
          ordem: e.ordem,
          instrucao: e.instrucao,
          oQueEvitar: e.oQueEvitar,
          frasesProntas: e.frasesProntas
        }))
      }
    }
  } catch (error) {
    console.error('Error adapting protocolo:', error)
    return {
      success: false,
      error: 'Falha ao adaptar o protocolo com IA.'
    }
  }
}
