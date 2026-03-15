import { prisma } from '@sala-funcionando/database/client'
import { IHistoricoRepository, HistoricoAtendimento } from '@sala-funcionando/domain'

export class PrismaHistoricoRepository implements IHistoricoRepository {
  async save(historico: HistoricoAtendimento): Promise<void> {
    await prisma.historicoAtendimento.create({
      data: {
        id: historico.id,
        turmaId: historico.turmaId,
        protocoloId: historico.protocoloId,
        alunoId: historico.alunoId,
        etapaAlcancada: historico.etapaAlcancada,
        helpAcionado: historico.helpAcionado,
        data: historico.data
      }
    })
  }

  async findByTurmaId(turmaId: string): Promise<HistoricoAtendimento[]> {
    const data = await prisma.historicoAtendimento.findMany({
      where: { turmaId }
    })

    return data.map(d => new HistoricoAtendimento({
      id: d.id,
      turmaId: d.turmaId,
      protocoloId: d.protocoloId,
      alunoId: d.alunoId || undefined,
      etapaAlcancada: d.etapaAlcancada,
      helpAcionado: d.helpAcionado,
      data: d.data
    }))
  }
}
