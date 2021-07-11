import mongoose from "mongoose";

const Schema = mongoose.Schema;
const noteSchema = new Schema(
  {
    content: {
      type: String,
      unique: true,
      required: {
        isRequired: true,
        message: "content is required",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("note", noteSchema);

export default Note;
