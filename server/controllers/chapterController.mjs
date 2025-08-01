import { findChapterById } from "../helpers/findChapterById.mjs";
import { verifyTokenAndGetUserId } from "../helpers/verifyTokenAndGetUserId.mjs";
import { validationResult } from "express-validator";
import Book from "../models/book.mjs";

export const getAllChapters = async (req, res) => {
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
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "トークンが付与されていません。" });
  }

  const userId = await verifyTokenAndGetUserId(token);
  const bookId = req.params.bookId;
  const chapterId = req.params.chapterId;

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

  try {
    res.json(responseData);
  } catch (err) {
    console.error("チャプターの取得に失敗しました", err);
    return res
      .status(500)
      .json({ message: "チャプターの取得に失敗しました。" });
  }
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

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "トークンが付与されていません。" });
  }

  const userId = await verifyTokenAndGetUserId(token);
  const bookId = req.params.bookId;
  const chapterId = req.params.chapterId;

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

  try {
    await book.save();
    res.json(chapter);
  } catch (err) {
    console.error("チャプターの編集に失敗しました", err);
    return res
      .status(500)
      .json({ message: "チャプターの編集に失敗しました。" });
  }
};

export const deleteChapter = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "トークンが付与されていません。" });
  }

  const userId = await verifyTokenAndGetUserId(token);
  const bookId = req.params.bookId;
  const chapterId = req.params.chapterId;

  const { book, error } = await findChapterById(userId, bookId, chapterId);

  if (error) {
    return res.status(404).json({ message: error });
  }

  book.chapters = book.chapters.filter(
    (chapter) => String(chapter._id) !== chapterId
  );

  try {
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
  } catch (err) {
    console.error("チャプターの削除に失敗しました", err);
    return res
      .status(500)
      .json({ message: "チャプターの削除に失敗しました。" });
  }
};
