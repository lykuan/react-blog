import { Schema, Types, model } from "mongoose"
const roomMessageSchema = new Schema(
  {
    sender: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    roomId: { type: Types.ObjectId, ref: "Room" },
    message: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
    },
    is_deleted: Boolean,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: false,
    },
  }
)

export const RoomMessage = model("RoomMessage", roomMessageSchema)
