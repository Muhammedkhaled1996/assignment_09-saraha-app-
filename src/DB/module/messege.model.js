import mongoose from "mongoose";

const messegeSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    image: { type: String },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    autoIndex: true,
    strict: true,
    strictQuery: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

export const MessagesModel =
  mongoose.models.Messages || mongoose.model("Messages", messegeSchema);
