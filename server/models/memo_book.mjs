import { Schema, model } from "mongoose";

const memoBookSchema = new Schema({
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
});

export const Book = model("memoBook", memoBookSchema);
