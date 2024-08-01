export interface User {
  id: string
  name: string,
  role: UserRole
  age: number
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}