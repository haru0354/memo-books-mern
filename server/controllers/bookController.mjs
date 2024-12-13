import Book from "../models/book.mjs";
import { validationResult } from "express-validator";
import { verifyTokenAndGetUserId } from "../helpers/verifyTokenAndGetUserId.mjs";

export const getAllBooks = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({ message: "トークンが付与されていません。" });
  }

  const userId = await verifyTokenAndGetUserId(token);

  try {
    const resData = await Book.aggregate([
      {
        $match: { userId },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          firstChapterId: { $arrayElemAt: ["$chapters._id", 0] },
        },
      },
    ]);

    res.json(resData);
  } catch (err) {
    console.error("データベースからの取得に失敗しました", err);
    return res
      .status(500)
      .json({ message: "データベースからの取得に失敗しました。" });
  }
};

export const getBook = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "トークンが付与されていません。" });
  }

  const userId = await verifyTokenAndGetUserId(token);
  const bookId = req.params.bookId;

  let book;
  try {
    book = await Book.findOne({ _id: bookId, userId });
  } catch (err) {
    console.error("データベースから本の取得に失敗しました。", err);
    return res
      .status(500)
      .json({ message: "データベースから本の取得に失敗しました。" });
  }

  if (!book) {
    return res.status(404).json({ message: "本が見つかりませんでした。" });
  }

  if (book.userId !== userId) {
    return res.status(403).json({ message: "権限がありません。" });
  }

  try {
    const resData = {
      title: book.title,
      _id: book._id,
    };

    if (resData.length === 0) {
      return res.status(404).json({ message: "本が見つかりませんでした。" });
    }

    res.json(resData);
  } catch (err) {
    console.error("データベースから本の取得に失敗しました", err);
    return res
      .status(500)
      .json({ message: "データベースから本の取得に失敗しました。" });
  }
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

  const userId = await verifyTokenAndGetUserId(token);

  const bookData = {
    userId,
    title: req.body.title,
    chapters: req.body.chapters,
  };

  try {
    const book = new Book(bookData);
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    console.error("本の作成に失敗しました", err);
    return res.status(500).json({ message: "本の作成に失敗しました。" });
  }
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

  const userId = await verifyTokenAndGetUserId(token);
  const bookId = req.params.bookId;

  let book;
  try {
    book = await Book.findOne({ _id: bookId, userId });
  } catch (err) {
    console.error("データベースから本の取得に失敗しました。", err);
    return res
      .status(500)
      .json({ message: "データベースから本の取得に失敗しました。" });
  }

  if (!book) {
    return res.status(404).json({ message: "本が見つかりませんでした。" });
  }

  if (book.userId !== userId) {
    return res.status(403).json({ message: "編集する権限がありません。" });
  }

  if (req.body.title) {
    book.title = req.body.title;
  }

  try {
    await book.save();
    res.json(book);
  } catch (err) {
    console.error("本の保存に失敗しました。", err);
    return res.status(500).json({ message: "本の保存に失敗しました。" });
  }
};

export const deleteBook = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "トークンが付与されていません。" });
  }

  const userId = await verifyTokenAndGetUserId(token);
  const bookId = req.params.bookId;

  let book;
  try {
    book = await Book.findById(bookId);
  } catch (err) {
    console.error("データベースから本の取得に失敗しました。", err);
    return res
      .status(500)
      .json({ message: "データベースから本の取得に失敗しました。" });
  }

  if (!book) {
    return res.status(404).json({ message: "本が見つかりませんでした。" });
  }

  if (book.userId !== userId) {
    return res.status(403).json({ message: "削除する権限がありません。" });
  }

  try {
    const result = await Book.deleteOne({ _id: bookId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "本が見つかりませんでした" });
    }
    res.json({ message: "本の削除に成功しました。", deletedBookId: bookId });
  } catch (err) {
    console.error("削除処理中にエラーが発生しました。", err);
    return res
      .status(500)
      .json({ message: "削除処理中にエラーが発生しました。" });
  }
};
