import { findChapterById } from "../helpers/findChapterById.mjs";
import Book from "../models/book.mjs";
import { validationResult } from "express-validator";

export const getAllChapters = async (req, res) => {
  const bookId = req.params.bookId;
  const book = await Book.findById(bookId);

  if (!book) {
    res.status(404).json({ message: "指定した本が見つかりませんでした" });
  }

  const chapters = book.chapters;
  const bookTitle = book.title;

  const chaptersWithoutContents =  chapters.map(chapter => ({
    chapter_title: chapter.chapter_title,
    _id: chapter._id
  }));

  res.json({bookTitle, chaptersWithoutContents});
};

export const getChapter = async (req, res) => {
  const bookId = req.params.bookId;
  const chapterId = req.params.chapterId;

  const { bookChapters, chapter, error } = await findChapterById(
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

  const bookId = req.params.bookId;
  const book = await Book.findById(bookId);

  if (!book) {
    return res
      .status(404)
      .json({ message: "指定したIDの本が見つかりませんでした。" });
  }

  const newChapter = { chapter_title: req.body.chapter_title };
  book.chapters.push(newChapter);
  await book.save();

  const savedChapter = book.chapters[book.chapters.length - 1];
  res.status(201).json(savedChapter);
};

export const updateChapter = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errs = errors.array();
    return res.status(400).json(errs);
  }

  const bookId = req.params.bookId;
  const chapterId = req.params.chapterId;

  const { chapter, book, error } = await findChapterById(bookId, chapterId);

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

  const { book, error } = await findChapterById(bookId, chapterId);

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
