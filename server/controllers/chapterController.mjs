import { Book } from "../models/book.mjs";

export const getAllChapters = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);

    if (!book) {
        res.status(404).json({ message: "指定した本が見つかりませんでした"})
    }

    const chapterTitles = book.chapters.map((chapter) => chapter.chapter_title);
    res.json(chapterTitles);
  } catch (err) {
    console.error("チャプターの一覧の取得に失敗しました。", err);
    res.status(500).json({ message: "チャプターの一覧の取得に失敗しました。" });
  }
};
