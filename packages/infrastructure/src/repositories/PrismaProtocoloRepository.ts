import { prisma } from '@sala-funcionando/database/client'
import { IProtocoloRepository, Protocolo, TipoCondicao, SubSituacao, EtapaProtocolo } from '@sala-funcionando/domain'

export class PrismaProtocoloRepository implements IProtocoloRepository {
  async findById(id: string): Promise<Protocolo | null> {
    const data = await prisma.protocolo.findUnique({
      where: { id },
      include: { etapas: true }
    })

    if (!data) return null

    const protocolo = new Protocolo({
      id: data.id,
      condicao: data.condicao as TipoCondicao,
      subSituacao: data.subSituacao as SubSituacao,
      versao: data.versao,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    })

    protocolo.adicionarEtapas(
      data.etapas.map(e => new EtapaProtocolo({
        id: e.id,
        protocoloId: e.protocoloId,
        ordem: e.ordem,
        instrucao: e.instrucao,
        oQueEvitar: e.oQueEvitar || undefined,
        frasesProntas: e.frasesProntas,
        createdAt: e.createdAt,
        updatedAt: e.updatedAt
      }))
    )

    return protocolo
  }

  async findByCondicaoESituacao(condicao: TipoCondicao, situacao: SubSituacao): Promise<Protocolo | null> {
    const data = await prisma.protocolo.findFirst({
      where: {
        condicao: condicao as string,
        subSituacao: situacao as string
      },
      include: { etapas: { orderBy: { ordem: 'asc' } } }
    })

    if (!data) return null

    const protocolo = new Protocolo({
      id: data.id,
      condicao: data.condicao as TipoCondicao,
      subSituacao: data.subSituacao as SubSituacao,
      versao: data.versao,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    })

    protocolo.adicionarEtapas(
      data.etapas.map(e => new EtapaProtocolo({
        id: e.id,
        protocoloId: e.protocoloId,
        ordem: e.ordem,
        instrucao: e.instrucao,
        oQueEvitar: e.oQueEvitar || undefined,
        frasesProntas: e.frasesProntas,
        createdAt: e.createdAt,
        updatedAt: e.updatedAt
      }))
    )

    return protocolo
  }

  async save(protocolo: Protocolo): Promise<void> {
    await prisma.protocolo.upsert({
      where: { id: protocolo.id },
      update: {
        condicao: protocolo.condicao,
        subSituacao: protocolo.subSituacao,
        versao: protocolo.versao,
      },
      create: {
        id: protocolo.id,
        condicao: protocolo.condicao,
        subSituacao: protocolo.subSituacao,
        versao: protocolo.versao,
      }
    })
    
    // Obs: Etapas should probably be handled separately or via nested upsert
    // for now, keeping it simple as per 1.5 goal
  }
}
