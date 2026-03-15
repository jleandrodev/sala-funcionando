export class TurmaNotFoundError extends Error {
  constructor() {
    super('Turma não encontrada.')
    this.name = 'TurmaNotFoundError'
  }
}
