import { describe, it, expect, vi, beforeEach } from 'vitest'
import { SaveHistoricoUseCase } from '../SaveHistoricoUseCase'
import { IHistoricoRepository, HistoricoAtendimento } from '@sala-funcionando/domain'

describe('SaveHistoricoUseCase', () => {
  let historicoRepository: IHistoricoRepository
  let sut: SaveHistoricoUseCase

  beforeEach(() => {
    vi.stubGlobal('crypto', {
      randomUUID: () => 'test-uuid'
    })
    historicoRepository = {
      save: vi.fn(),
      findAllByTurma: vi.fn(),
      findAllByProfessor: vi.fn(),
      findById: vi.fn()
    } as any
    sut = new SaveHistoricoUseCase(historicoRepository)
  })

  it('should save a new historico', async () => {
    const input = {
      turmaId: 't1',
      protocoloId: 'prot1',
      etapaAlcancada: 3,
      helpAcionado: false
    }

    const result = await sut.execute(input)

    expect(result).toBeInstanceOf(HistoricoAtendimento)
    expect(result.etapaAlcancada).toBe(3)
    expect(historicoRepository.save).toHaveBeenCalled()
  })
})
