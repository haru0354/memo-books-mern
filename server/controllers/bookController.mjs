import Book from "../models/book.mjs";
import { validationResult } from "express-validator";
import { verifyToken } from "../helpers/verifyToken.mjs";

export const getAllBooks = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "トークンが付与されていません。" });
  }

  let userId;
  try {
    const decodedToken = await verifyToken(token);
    userId = decodedToken.uid;
  } catch (err) {
    console.log("トークンの検証に失敗しました", err);
    return;
  }

  const resData = await Book.aggregate([
    {
      $match: { userId },
    },
    {
      // 最初のチャプターのIDを取得
      $project: {
        _id: 1,
        title: 1,
        firstChapterId: { $arrayElemAt: ["$chapters._id", 0] },
      },
    },
  ]);

  res.json(resData);
};

export const getBook = async (req, res) => {
  const bookId = req.params.bookId;
  const userId = req.params.userId;

  if (!userId) {
    return res.status(403).json({ message: "idが付与されていません。" });
  }

  const book = await Book.findOne({ _id: bookId, userId });

  if (!book) {
    return res.status(404).json({ message: "本が見つかりませんでした。" });
  }

  const resData = {
    title: book.title,
    _id: book._id,
  };

  res.json(resData);
};

export const addBook = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errs = errors.array();
    return res.status(400).json(errs);
  }

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "トークンが付与されていません。" });
  }

  let userId;
  try {
    const decodedToken = await verifyToken(token);
    userId = decodedToken.uid;
  } catch (err) {
    console.log("トークンの検証に失敗しました", err);
    return;
  }

  const book = new Book({
    userId,
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

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "トークンが付与されていません。" });
  }

  let userId;
  try {
    const decodedToken = await verifyToken(token);    
    userId = decodedToken.uid;
  } catch (err) {
    console.log("トークンの検証に失敗しました", err);
    return;
  }

  const bookId = req.params.bookId;
  const book = await Book.findOne({ _id: bookId, userId });

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
  const bookId = req.params.bookId;
  const userId = req.params.userId;
  const book = await Book.findById(bookId);

  if (book.userId !== userId) {
    return res.status(403).json({ message: "削除する権限がありません。" });
  }

  const result = await Book.deleteOne({ _id: bookId });

  if (result.deletedCount === 0) {
    return res.status(404).json({ message: "本が見つかりませんでした" });
  }

  res.json({ message: "本の削除に成功しました。", deletedBookId: bookId });
};
