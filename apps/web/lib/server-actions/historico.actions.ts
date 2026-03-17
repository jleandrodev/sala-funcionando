'use server'

import { SaveHistoricoUseCase } from '@sala-funcionando/application'
import { PrismaHistoricoRepository } from '@sala-funcionando/infrastructure'
import { SaveHistoricoDTO } from '@sala-funcionando/application'

const historicoRepository = new PrismaHistoricoRepository()
const saveHistoricoUseCase = new SaveHistoricoUseCase(historicoRepository)

export async function saveHistoricoAction(data: SaveHistoricoDTO) {
  try {
    const historico = await saveHistoricoUseCase.execute(data)
    return {
      success: true,
      id: historico.id
    }
  } catch (error) {
    console.error('Error saving history:', error)
    return {
      success: false,
      error: 'Falha ao salvar o histórico de atendimento.'
    }
  }
}

export async function getHistoricoPorTurmaAction(turmaId: string) {
  try {
    const historico = await historicoRepository.findByTurmaId(turmaId)
    return historico.map(h => ({
      id: h.id,
      protocoloId: h.protocoloId,
      etapaAlcancada: h.etapaAlcancada,
      helpAcionado: h.helpAcionado,
      data: h.data
    }))
  } catch (error) {
    console.error('Error fetching history:', error)
    return []
  }
}

export async function getHistoricoComCondicaoAction(turmaId: string) {
  try {
    const { prisma } = await import('@sala-funcionando/database/client')
    const historico = await prisma.historicoAtendimento.findMany({
      where: { turmaId },
      include: { protocolo: { select: { condicao: true, subSituacao: true } } },
      orderBy: { data: 'desc' },
    })
    return historico.map(h => ({
      id: h.id,
      condicao: h.protocolo?.condicao ?? 'OUTRO',
      subSituacao: h.protocolo?.subSituacao ?? '',
      etapaAlcancada: h.etapaAlcancada,
      helpAcionado: h.helpAcionado,
      data: h.data,
    }))
  } catch (error) {
    console.error('Error fetching history with condition:', error)
    return []
  }
}
