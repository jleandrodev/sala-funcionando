import { describe, it, expect, vi, beforeEach } from 'vitest'
import { AdaptProtocoloUseCase } from '../AdaptProtocoloUseCase'
import { 
  IAIAdapter, 
  ITurmaRepository, 
  IProtocoloRepository, 
  ProtocoloNotFoundError, 
  TurmaNotFoundError 
} from '@sala-funcionando/domain'

describe('AdaptProtocoloUseCase', () => {
  let aiAdapter: IAIAdapter
  let turmaRepository: ITurmaRepository
  let protocoloRepository: IProtocoloRepository
  let sut: AdaptProtocoloUseCase

  beforeEach(() => {
    aiAdapter = {
      adapt: vi.fn(),
      suggestImprovements: vi.fn()
    } as any
    turmaRepository = {
      findById: vi.fn()
    } as any
    protocoloRepository = {
      findById: vi.fn()
    } as any
    sut = new AdaptProtocoloUseCase(aiAdapter, turmaRepository, protocoloRepository)
  })

  it('should adapt a protocolo using AI', async () => {
    const mockProtocolo = { id: 'p1' }
    const mockTurma = { id: 't1' }
    const mockAdapted = { id: 'p1', adapted: true }

    vi.mocked(protocoloRepository.findById).mockResolvedValue(mockProtocolo as any)
    vi.mocked(turmaRepository.findById).mockResolvedValue(mockTurma as any)
    vi.mocked(aiAdapter.adapt).mockResolvedValue(mockAdapted as any)

    const result = await sut.execute('p1', 't1')

    expect(result).toEqual(mockAdapted)
    expect(aiAdapter.adapt).toHaveBeenCalledWith(mockProtocolo, mockTurma)
  })

  it('should throw ProtocoloNotFoundError if protocolo not found', async () => {
    vi.mocked(protocoloRepository.findById).mockResolvedValue(null)

    await expect(sut.execute('invalid', 't1')).rejects.toThrow(ProtocoloNotFoundError)
  })

  it('should throw TurmaNotFoundError if turma not found', async () => {
    vi.mocked(protocoloRepository.findById).mockResolvedValue({ id: 'p1' } as any)
    vi.mocked(turmaRepository.findById).mockResolvedValue(null)

    await expect(sut.execute('p1', 'invalid')).rejects.toThrow(TurmaNotFoundError)
  })
})
