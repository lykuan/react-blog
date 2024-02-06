import { Schema, Types, model } from "mongoose"
import { TRoom } from "./types/Room"

const roomSchema = new Schema<TRoom>({
  type: { type: String, required: true },
  name: { type: String, required: true, unique: true, trim: true, text: true },
  owner: Types.ObjectId,
  users: [{ type: Types.ObjectId, ref: "User" }],
  messages: [{ type: Types.ObjectId, ref: "RoomMessage" }],
  is_delete: { type: Boolean, default: false },
})

export const Room = model<TRoom>("Room", roomSchema)
