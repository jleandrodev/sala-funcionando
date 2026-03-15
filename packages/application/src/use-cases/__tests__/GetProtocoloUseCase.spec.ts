import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GetProtocoloUseCase } from '../GetProtocoloUseCase'
import { 
  IProtocoloRepository, 
  ProtocoloNotFoundError, 
  TipoCondicao, 
  SubSituacao 
} from '@sala-funcionando/domain'

describe('GetProtocoloUseCase', () => {
  let protocoloRepository: IProtocoloRepository
  let sut: GetProtocoloUseCase

  beforeEach(() => {
    protocoloRepository = {
      findByCondicaoESituacao: vi.fn(),
      findAll: vi.fn(),
      findById: vi.fn()
    } as any
    sut = new GetProtocoloUseCase(protocoloRepository)
  })

  it('should return a protocolo when it exists', async () => {
    const mockProtocolo = {
      id: '1',
      condicao: TipoCondicao.TEA,
      situacao: SubSituacao.AGRESSIVIDADE,
      titulo: 'Protocolo de Crise',
      descricao: 'Descricao',
      etapas: []
    }

    vi.mocked(protocoloRepository.findByCondicaoESituacao).mockResolvedValue(mockProtocolo as any)

    const result = await sut.execute(TipoCondicao.TEA, SubSituacao.AGRESSIVIDADE)

    expect(result).toBe(mockProtocolo)
    expect(protocoloRepository.findByCondicaoESituacao).toHaveBeenCalledWith(
      TipoCondicao.TEA, 
      SubSituacao.AGRESSIVIDADE
    )
  })

  it('should throw ProtocoloNotFoundError when protocolo does not exist', async () => {
    vi.mocked(protocoloRepository.findByCondicaoESituacao).mockResolvedValue(null)

    await expect(
      sut.execute(TipoCondicao.TEA, SubSituacao.AGRESSIVIDADE)
    ).rejects.toThrow(ProtocoloNotFoundError)
  })
})
