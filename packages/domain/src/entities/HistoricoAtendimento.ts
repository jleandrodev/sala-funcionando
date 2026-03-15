export interface HistoricoAtendimentoProps {
  id: string
  turmaId: string
  protocoloId: string
  alunoId?: string
  etapaAlcancada: number
  helpAcionado: boolean
  data: Date
}

export class HistoricoAtendimento {
  constructor(public readonly props: HistoricoAtendimentoProps) {}

  get id() { return this.props.id }
  get turmaId() { return this.props.turmaId }
  get protocoloId() { return this.props.protocoloId }
  get alunoId() { return this.props.alunoId }
  get etapaAlcancada() { return this.props.etapaAlcancada }
  get helpAcionado() { return this.props.helpAcionado }
  get data() { return this.props.data }
}
