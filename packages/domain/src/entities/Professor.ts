export interface ProfessorProps {
  id: string
  userId: string
  name?: string
  email: string
  createdAt?: Date
  updatedAt?: Date
}

export class Professor {
  constructor(public readonly props: ProfessorProps) {}

  get id() { return this.props.id }
  get userId() { return this.props.userId }
  get name() { return this.props.name }
  get email() { return this.props.email }
}
