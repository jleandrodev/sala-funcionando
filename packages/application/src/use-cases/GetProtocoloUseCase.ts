import { 
  IProtocoloRepository, 
  ProtocoloNotFoundError, 
  TipoCondicao, 
  SubSituacao 
} from '@sala-funcionando/domain'

export class GetProtocoloUseCase {
  constructor(private protocoloRepository: IProtocoloRepository) {}

  async execute(condicao: TipoCondicao, situacao: SubSituacao) {
    const protocolo = await this.protocoloRepository.findByCondicaoESituacao(condicao, situacao)

    if (!protocolo) {
      throw new ProtocoloNotFoundError()
    }

    return protocolo
  }
}
