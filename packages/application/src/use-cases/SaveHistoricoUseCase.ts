import { IHistoricoRepository, HistoricoAtendimento } from '@sala-funcionando/domain'
import { SaveHistoricoDTO } from '../dtos/HistoricoDTOs'

export class SaveHistoricoUseCase {
  constructor(private historicoRepository: IHistoricoRepository) {}

  async execute(input: SaveHistoricoDTO) {
    const historico = new HistoricoAtendimento({
      id: crypto.randomUUID(),
      data: new Date(),
      ...input
    })

    await this.historicoRepository.save(historico)

    return historico
  }
}
