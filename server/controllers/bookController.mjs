import Book from "../models/book.mjs";
import { validationResult } from "express-validator";

export const getAllBooks = async (req, res) => {
  const books = await Book.aggregate([
    {
      $project: {
        title: 1,
        firstChapterId: { $arrayElemAt: ["$chapters._id", 0] },
      },
    },
  ]);

  res.json(books);
};

export const getBook = async (req, res) => {
  const bookId = req.params.id;
  const book = await Book.findById(bookId);

  if (!book) {
    return res.status(404).json({ message: "本が見つかりませんでした。" });
  }

  res.json(book);
};

export const addBook = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errs = errors.array();
    return res.status(400).json(errs);
  }

  const book = new Book({
    title: req.body.title,
    chapters: req.body.chapters,
  });

  const newBook = await book.save();

  res.status(201).json(newBook);
};

export const updateBook = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errs = errors.array();
    return res.status(400).json(errs);
  }

  const bookId = req.params.id;
  const book = await Book.findById(bookId);

  if (!book) {
    return res.status(404).json({ message: "本が見つかりませんでした。" });
  }

  if (req.body.title) {
    book.title = req.body.title;
  }

  await book.save();
  res.json(book);
};

export const deleteBook = async (req, res) => {
  const bookId = req.params.id;
  const result = await Book.deleteOne({ _id: bookId });

  if (result.deletedCount === 0) {
    return res.status(404).json({ message: "本が見つかりませんでした" });
  }

  res.json({ message: "本の削除に成功しました。" });
};
