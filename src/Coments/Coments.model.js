import mongoose, { Schema } from "mongoose";

const CommentsSchema = new Schema({
  idUser: {
    type: String,
    ref: "Users",
  },
  userNameCom: {
    type: String,
    ref: "Users",
  },
  comment: {
    type: String,
    required: true,
  },
  idPosteo: {
    type: String,
    ref: "Posts",
  },
  stateComment: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("Comments", CommentsSchema);
