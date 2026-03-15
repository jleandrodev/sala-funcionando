'use server'

import { PrismaTurmaRepository, PrismaProfessorRepository } from '@sala-funcionando/infrastructure'
import { RegisterTurmaUseCase } from '@sala-funcionando/application'
import { Professor } from '@sala-funcionando/domain'
import { revalidatePath } from 'next/cache'

const turmaRepository = new PrismaTurmaRepository()
const professorRepository = new PrismaProfessorRepository()
const registerTurmaUseCase = new RegisterTurmaUseCase(turmaRepository)

export async function getTurmasAction(professorId: string) {
  try {
    const turmas = await turmaRepository.findByProfessorId(professorId)
    return turmas.map(t => ({
      id: t.id,
      nome: t.nome,
      faixaEtaria: t.faixaEtaria,
      tamanho: t.tamanho,
      alunosNEE: t.alunosNEE
    }))
  } catch (error) {
    console.error('Error fetching turmas:', error)
    return []
  }
}

export async function createTurmaAction(data: {
  professorId: string
  nome: string
  faixaEtaria: string
  tamanho: number
  alunosNEE: number
}) {
  try {
    // Ensures professor exists before creating turma
    let prof = await professorRepository.findById(data.professorId)
    if (!prof) {
      prof = new Professor({
        id: data.professorId,
        userId: data.professorId,
        email: data.professorId + "@placeholder.com", // Fallback if no email provided
        name: "Professor"
      })
      await professorRepository.save(prof)
    }

    await registerTurmaUseCase.execute(data)
    revalidatePath('/turmas')
    return { success: true }
  } catch (error) {
    console.error('Error creating turma:', error)
    return { success: false, error: 'Falha ao criar turma' }
  }
}
