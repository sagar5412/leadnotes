import mongoose, { Document, Schema } from "mongoose";

export interface INote extends Document {
  title: string;
  content: string;
  userId: string;
  userEmail: string;
  createdAt: Date;
}

const noteSchema = new Schema<INote>({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    maxlength: [100, "Title cannot exceed 100 characters"],
  },
  content: {
    type: String,
    required: [true, "Content is required"],
    trim: true,
  },
  userId: {
    type: String,
    required: true,
    index: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Note = mongoose.model<INote>("Note", noteSchema);

export default Note;
