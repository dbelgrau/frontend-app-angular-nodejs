import { User } from "./user.model";

export interface Post {
  id: string
  author: User,
  title: string
  tags: string[]
  date: string
  content: string
  verified: boolean
}