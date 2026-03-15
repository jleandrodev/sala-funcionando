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
