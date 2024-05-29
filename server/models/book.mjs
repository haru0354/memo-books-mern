import { Schema, model } from "mongoose";

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    chapters: [
      {
        chapter_title: {
          type: String,
          required: true,
        },
        contents: [
          {
            heading_title: {
              type: String,
              required: true,
            },
            content: {
              type: String,
              required: true,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const Book = model("Book", bookSchema);

export default Book ;