import { 
  IAIAdapter, 
  ITurmaRepository, 
  IProtocoloRepository, 
  ProtocoloNotFoundError, 
  TurmaNotFoundError 
} from '@sala-funcionando/domain'

export class AdaptProtocoloUseCase {
  constructor(
    private aiAdapter: IAIAdapter,
    private turmaRepository: ITurmaRepository,
    private protocoloRepository: IProtocoloRepository
  ) {}

  async execute(protocoloId: string, turmaId: string) {
    const protocolo = await this.protocoloRepository.findById(protocoloId)
    if (!protocolo) throw new ProtocoloNotFoundError()

    const turma = await this.turmaRepository.findById(turmaId)
    if (!turma) throw new TurmaNotFoundError()

    return await this.aiAdapter.adapt(protocolo, turma)
  }
}
