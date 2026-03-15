import { ITurmaRepository, Turma } from '@sala-funcionando/domain'
import { RegisterTurmaDTO } from '../dtos/TurmaDTOs'

export class RegisterTurmaUseCase {
  constructor(private turmaRepository: ITurmaRepository) {}

  async execute(input: RegisterTurmaDTO) {
    const turma = new Turma({
      id: crypto.randomUUID(),
      ...input
    })

    await this.turmaRepository.save(turma)

    return turma
  }
}
