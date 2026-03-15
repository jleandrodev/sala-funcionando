import { prisma } from '@sala-funcionando/database/client'
import { IProfessorRepository, Professor } from '@sala-funcionando/domain'

export class PrismaProfessorRepository implements IProfessorRepository {
  async findById(id: string): Promise<Professor | null> {
    const data = await prisma.professor.findUnique({
      where: { id }
    })

    if (!data) return null

    return new Professor({
      id: data.id,
      userId: data.userId,
      name: data.name || undefined,
      email: data.email,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    })
  }

  async findByUserId(userId: string): Promise<Professor | null> {
    const data = await prisma.professor.findUnique({
      where: { userId }
    })

    if (!data) return null

    return new Professor({
      id: data.id,
      userId: data.userId,
      name: data.name || undefined,
      email: data.email,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    })
  }

  async save(professor: Professor): Promise<void> {
    await prisma.professor.upsert({
      where: { id: professor.id },
      update: {
        name: professor.name,
        email: professor.email
      },
      create: {
        id: professor.id,
        userId: professor.userId,
        name: professor.name,
        email: professor.email
      }
    })
  }
}
