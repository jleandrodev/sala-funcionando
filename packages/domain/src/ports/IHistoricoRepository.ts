import { HistoricoAtendimento } from '../entities/HistoricoAtendimento'

export interface IHistoricoRepository {
  save(historico: HistoricoAtendimento): Promise<void>
  findByTurmaId(turmaId: string): Promise<HistoricoAtendimento[]>
}
