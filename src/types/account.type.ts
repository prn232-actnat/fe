export interface Account {
  id: number
  role: string
  phone: string
  email: string
  fullName: string
}

export interface AccountDetail extends Account {
  address: string
  dateOfBirth: string
}
