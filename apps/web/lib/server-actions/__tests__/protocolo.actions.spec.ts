import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getProtocoloAction } from '../protocolo.actions'
import { GetProtocoloUseCase } from '@sala-funcionando/application'

// Mock do UseCase que é instanciado no módulo
vi.mock('@sala-funcionando/application', () => ({
  GetProtocoloUseCase: vi.fn()
}))

vi.mock('@sala-funcionando/infrastructure', () => ({
  PrismaProtocoloRepository: vi.fn()
}))

describe('getProtocoloAction', () => {
  const mockExecute = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    // Configura o mock do constructor para retornar um objeto com o método execute
    ;(GetProtocoloUseCase as any).mockImplementation(() => ({
      execute: mockExecute
    }))
  })

  it('should return a formatted protocolo when found', async () => {
    const mockProtocolo = {
      id: '1',
      condicao: 'TEA',
      subSituacao: 'AGRESSIVIDADE',
      etapas: [
        { id: 'e1', ordem: 1, instrucao: 'Stay calm', oQueEvitar: 'Shouting', frasesProntas: [] }
      ]
    }

    mockExecute.mockResolvedValue(mockProtocolo)

    const result = await getProtocoloAction('tea', 'agressividade')

    expect(result).toEqual(mockProtocolo)
    expect(mockExecute).toHaveBeenCalledWith('TEA', 'AGRESSIVIDADE')
  })

  it('should return null when use case throws', async () => {
    mockExecute.mockRejectedValue(new Error('Not found'))

    const result = await getProtocoloAction('tea', 'invalid')

    expect(result).toBeNull()
  })
})
