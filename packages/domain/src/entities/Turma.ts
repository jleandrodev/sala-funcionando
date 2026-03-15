export interface TurmaProps {
  id: string
  professorId: string
  nome: string
  faixaEtaria: string
  tamanho: number
  alunosNEE: number
  createdAt?: Date
  updatedAt?: Date
}

export class Turma {
  constructor(public readonly props: TurmaProps) {}

  get id() { return this.props.id }
  get professorId() { return this.props.professorId }
  get nome() { return this.props.nome }
  get faixaEtaria() { return this.props.faixaEtaria }
  get tamanho() { return this.props.tamanho }
  get alunosNEE() { return this.props.alunosNEE }
}
