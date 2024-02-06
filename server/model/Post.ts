import { Schema, model, Types } from "mongoose"
import { TPost } from "./types/Post"
import { TUser } from "./types/User"
const postSchema = new Schema<TPost>(
  {
    title: {
      type: String,
      required: true,
      index: true,
      trim: true,
      text: true,
    },
    author: { type: Types.Subdocument<TUser>, required: true, text: true },
    content: { type: String, required: true },
    cover: { type: String, required: true },
    rating: [Number],
    comments: [{ type: Types.ObjectId, ref: "Comment" }],
    likes: [Types.ObjectId],
    viewCount: { type: Number, default: 0 },
    calc_rating: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export const Post = model<TPost>("Post", postSchema)
