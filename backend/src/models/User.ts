export interface User {
    id: number
    name: string
    email: string
    password: string
    role: 'listener' | 'producer'
    created_at: Date
  }
  