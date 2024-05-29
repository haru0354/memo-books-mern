import Book from "../models/book.mjs";
import { Types } from "mongoose";

export const getAllChapters = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);

    if (!book) {
      res.status(404).json({ message: "指定した本が見つかりませんでした" });
    }

    const chapterTitles = book.chapters.map((chapter) => chapter.chapter_title);
    res.json(chapterTitles);
  } catch (err) {
    console.error("チャプターの一覧の取得に失敗しました。", err);
    res.status(500).json({ message: "チャプターの一覧の取得に失敗しました。" });
  }
};

export const getChapter = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);

    if (!book) {
      res.status(404).json({ message: "指定した本が見つかりませんでした" });
    }

    const chapterId = req.params.chapterId;
    const chapter = book.chapters.find(
      (chapter) => String(chapter._id) === chapterId
    );

    if (!chapter) {
      return res
        .status(404)
        .json({ message: "指定したチャプターが見つかりませんでした" });
    }

    res.json(chapter);
  } catch (err) {
    console.error("チャプターの取得に失敗しました", err);
    res.status(500).json({ message: "チャプターの取得に失敗しました" });
  }
};
