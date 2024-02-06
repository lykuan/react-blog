export type TPost = {
  description?: string
  title: string
  content: string
  cover: string
  author: Object
  createAt: Date
  updateAt: Date
  viewCount: number
  rating: number[]
  comments: string[]
  likes:string[]
  calc_rating:number
}
