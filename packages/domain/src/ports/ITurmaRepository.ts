import { Turma } from '../entities/Turma'

export interface ITurmaRepository {
  findById(id: string): Promise<Turma | null>
  findByProfessorId(professorId: string): Promise<Turma[]>
  save(turma: Turma): Promise<void>
  delete(id: string): Promise<void>
}
