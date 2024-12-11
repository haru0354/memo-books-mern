import { findChapterById } from "../helpers/findChapterById.mjs";
import { verifyToken } from "../helpers/verifyToken.mjs";
import Book from "../models/book.mjs";
import { validationResult } from "express-validator";

export const getAllChapters = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "トークンが付与されていません。" });
  }

  let userId;
  try {
    const decodedToken = await verifyToken(token);
    userId = decodedToken.uid;
  } catch (err) {
    console.error("トークンの検証に失敗しました", err.name);
    return res.status(401).json({ message: "トークンの検証に失敗しました。" });
  }

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
    res.status(404).json({ message: "指定した本が見つかりませんでした" });
  }

  const chapters = book.chapters;
  const bookTitle = book.title;

  try {
    const chaptersWithoutContents = chapters.map((chapter) => ({
      chapter_title: chapter.chapter_title,
      _id: chapter._id,
    }));

    res.json({ bookTitle, chaptersWithoutContents });
  } catch (err) {
    console.error("全てのチャプターを取得するのに失敗しました", err);
    return res
      .status(500)
      .json({ message: "全てのチャプターを取得するのに失敗しました。" });
  }
};

export const getChapter = async (req, res) => {
  const bookId = req.params.bookId;
  const chapterId = req.params.chapterId;
  const userId = req.params.userId;

  const { bookChapters, chapter, error } = await findChapterById(
    userId,
    bookId,
    chapterId
  );

  if (error) {
    return res.status(404).json({ message: error });
  }

  const responseData = {
    bookChapters: bookChapters,
    chapter: chapter,
  };

  res.json(responseData);
};

export const addChapter = async (req, res) => {
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
    console.error("トークンの検証に失敗しました", err.name);
    return res.status(401).json({ message: "トークンの検証に失敗しました。" });
  }

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
    return res
      .status(404)
      .json({ message: "指定したIDの本が見つかりませんでした。" });
  }

  const newChapter = { chapter_title: req.body.chapter_title };
  book.chapters.push(newChapter);

  try {
    await book.save();

    const savedChapter = book.chapters[book.chapters.length - 1];
    res.status(201).json(savedChapter);
  } catch (err) {
    console.error("チャプターの作成に失敗しました", err);
    return res
      .status(500)
      .json({ message: "チャプターの作成に失敗しました。" });
  }
};

export const updateChapter = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errs = errors.array();
    return res.status(400).json(errs);
  }

  const bookId = req.params.bookId;
  const chapterId = req.params.chapterId;
  const userId = req.params.userId;

  const { chapter, book, error } = await findChapterById(
    userId,
    bookId,
    chapterId
  );

  if (error) {
    return res.status(404).json({ message: error });
  }

  const newChapterTitle = req.body.chapter_title;

  if (newChapterTitle) {
    chapter.chapter_title = newChapterTitle;
  }

  await book.save();
  res.json(chapter);
};

export const deleteChapter = async (req, res) => {
  const bookId = req.params.bookId;
  const chapterId = req.params.chapterId;
  const userId = req.params.userId;

  const { book, error } = await findChapterById(userId, bookId, chapterId);

  if (error) {
    return res.status(404).json({ message: error });
  }

  book.chapters = book.chapters.filter(
    (chapter) => String(chapter._id) !== chapterId
  );

  await book.save();

  let redirectedUrl = undefined;
  if (book.chapters.length) {
    redirectedUrl = book.chapters[0]._id;
  }

  res.json({
    message: "チャプターを削除しました。",
    deletedChapterId: chapterId,
    redirectedUrl: redirectedUrl,
  });
};
