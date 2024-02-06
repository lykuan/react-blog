export type TAddress = {
  province: string
  city: string
}
export type TProfile = {
  age: number
  bio?: string
  name?: string
  address?: TAddress
}
export type TUser = {
  email: string
  nickname: string
  password: string
  profile: TProfile
  posts: String[]
  rooms: String[]
  roomMessage: string[]
  is_admin: string[]
  is_delete: boolean
  online: boolean
  last_seen: Date
  avatar?: string
}
