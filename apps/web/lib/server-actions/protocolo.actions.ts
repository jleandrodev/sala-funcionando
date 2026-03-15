'use server'

import { GetProtocoloUseCase } from '@sala-funcionando/application'
import { PrismaProtocoloRepository } from '@sala-funcionando/infrastructure'
import { TipoCondicao, SubSituacao } from '@sala-funcionando/domain'

const protocoloRepository = new PrismaProtocoloRepository()
const getProtocoloUseCase = new GetProtocoloUseCase(protocoloRepository)

export async function getProtocoloAction(condicao: string, situacao: string) {
  try {
    // Tenta converter strings para os enums. O banco usa strings uppercase por padrão.
    const condicaoEnum = condicao.toUpperCase() as TipoCondicao
    const situacaoEnum = situacao.toUpperCase().replace(/-/g, '_') as SubSituacao

    const protocolo = await getProtocoloUseCase.execute(condicaoEnum, situacaoEnum)

    return {
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
  } catch (error) {
    console.error('Error fetching protocolo:', error)
    return null
  }
}
