export interface AlunoProps {
  id: string
  turmaId: string
  nome?: string
  condicao?: string
  observacoes?: string
  createdAt?: Date
  updatedAt?: Date
}

export class Aluno {
  constructor(public readonly props: AlunoProps) {}

  get id() { return this.props.id }
  get turmaId() { return this.props.turmaId }
  get nome() { return this.props.nome }
  get condicao() { return this.props.condicao }
  get observacoes() { return this.props.observacoes }
}
