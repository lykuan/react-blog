import { TProfile, TUser, TAddress } from "./types/User"
import { Schema, model, Types } from "mongoose"
const AddressSchema = new Schema<TAddress>({
  province: String,
  city: String,
})
const ProfileSchema = new Schema<TProfile>({
  name: String,
  address: {},
})
const userSchema = new Schema<TUser>(
  {
    nickname: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      text: true,
    },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "" },
    last_seen: { type: Date, default: Date.now },
    posts: [{ type: Types.ObjectId, ref: "Post" }],
    rooms: [{ type: Types.ObjectId, ref: "Room" }],
    is_admin: [Types.ObjectId],
    is_delete: { type: Boolean, default: false },
    online: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export const User = model<TUser>("User", userSchema)
