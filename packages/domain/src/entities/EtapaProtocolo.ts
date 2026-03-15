export interface EtapaProtocoloProps {
  id: string
  protocoloId: string
  ordem: number
  instrucao: string
  oQueEvitar?: string
  frasesProntas: string[]
  createdAt?: Date
  updatedAt?: Date
}

export class EtapaProtocolo {
  constructor(public readonly props: EtapaProtocoloProps) {}

  get id() { return this.props.id }
  get ordem() { return this.props.ordem }
  get instrucao() { return this.props.instrucao }
  get oQueEvitar() { return this.props.oQueEvitar }
  get frasesProntas() { return this.props.frasesProntas }
}
