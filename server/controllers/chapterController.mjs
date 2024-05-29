import { Chapter, Book } from "../models/book.mjs";

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

export const addChapter = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);

    if (!book) {
      return res
        .status(404)
        .json({ message: "指定したIDの本が見つかりませんでした。" });
    }

    const chapter = new Chapter({ chapter_title: req.body.chapter_title }); 
    const newChapter = await chapter.save();
    book.chapters.push(newChapter);
    await book.save();

    res.status(201).json(newChapter);
  } catch (err) {
    console.error("チャプターの登録に失敗しました。", err);
    res.status(500).json({ message: "チャプターの登録に失敗しました。" });
  }
};

export const updateChapter = async (req, res) => {
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

    const newChapterTitle = req.body.chapter_title;

    if (newChapterTitle) {
      chapter.chapter_title = newChapterTitle;
    }

    await book.save();
    res.json(chapter);
  } catch (err) {
    console.error("チャプターの取得に失敗しました", err);
    res.status(500).json({ message: "チャプターの取得に失敗しました" });
  }
};
