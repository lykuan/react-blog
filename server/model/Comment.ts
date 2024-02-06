import { model,Schema, Types } from "mongoose"

import { TComment } from "./types/Comment"

export const commentSchema = new Schema<TComment>(
  {
    comment: { type: String, required: true },
    userId: { type: Types.ObjectId, ref: "User" },
    likes: [Types.ObjectId],
  },
  { timestamps: { createdAt: true, updatedAt: false } }
)
export const Comment = model<TComment>("Comment", commentSchema)
