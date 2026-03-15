import { prisma } from '@sala-funcionando/database/client'
import { ITurmaRepository, Turma } from '@sala-funcionando/domain'

export class PrismaTurmaRepository implements ITurmaRepository {
  async findById(id: string): Promise<Turma | null> {
    const data = await prisma.turma.findUnique({
      where: { id }
    })

    if (!data) return null

    return new Turma({
      id: data.id,
      professorId: data.professorId,
      nome: data.nome,
      faixaEtaria: data.faixaEtaria,
      tamanho: data.tamanho,
      alunosNEE: data.alunosNEE,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    })
  }

  async findByProfessorId(professorId: string): Promise<Turma[]> {
    const data = await prisma.turma.findMany({
      where: { professorId }
    })

    return data.map(d => new Turma({
      id: d.id,
      professorId: d.professorId,
      nome: d.nome,
      faixaEtaria: d.faixaEtaria,
      tamanho: d.tamanho,
      alunosNEE: d.alunosNEE,
      createdAt: d.createdAt,
      updatedAt: d.updatedAt
    }))
  }

  async save(turma: Turma): Promise<void> {
    await prisma.turma.upsert({
      where: { id: turma.id },
      update: {
        nome: turma.nome,
        faixaEtaria: turma.faixaEtaria,
        tamanho: turma.tamanho,
        alunosNEE: turma.alunosNEE
      },
      create: {
        id: turma.id,
        professorId: turma.professorId,
        nome: turma.nome,
        faixaEtaria: turma.faixaEtaria,
        tamanho: turma.tamanho,
        alunosNEE: turma.alunosNEE
      }
    })
  }

  async delete(id: string): Promise<void> {
    await prisma.turma.delete({
      where: { id }
    })
  }
}
