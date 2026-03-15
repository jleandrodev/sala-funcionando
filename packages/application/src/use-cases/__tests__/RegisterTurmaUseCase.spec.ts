import { describe, it, expect, vi, beforeEach } from 'vitest'
import { RegisterTurmaUseCase } from '../RegisterTurmaUseCase'
import { ITurmaRepository, Turma } from '@sala-funcionando/domain'

describe('RegisterTurmaUseCase', () => {
  let turmaRepository: ITurmaRepository
  let sut: RegisterTurmaUseCase

  beforeEach(() => {
    vi.stubGlobal('crypto', {
      randomUUID: () => 'uuid'
    })
    turmaRepository = {
      save: vi.fn(),
      findById: vi.fn(),
      findAllByProfessor: vi.fn(),
      update: vi.fn(),
      delete: vi.fn()
    } as any
    sut = new RegisterTurmaUseCase(turmaRepository)
  })

  it('should register a new turma', async () => {
    const input = {
      nome: 'Turma A',
      professorId: 'p1',
      faixaEtaria: '6-7 anos',
      tamanho: 20,
      alunosNEE: 2
    }

    const result = await sut.execute(input)

    expect(result).toBeInstanceOf(Turma)
    expect(result.nome).toBe(input.nome)
    expect(turmaRepository.save).toHaveBeenCalled()
  })
})
