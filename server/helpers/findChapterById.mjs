import Book from "../models/book.mjs";

export const findChapterById = async (bookId, chapterId) => {
  try {
    const book = await Book.findById(bookId);

    if (!book) {
      return { error: "指定した本が見つかりませんでした。" };
    }

    const chapter = book.chapters.find(
      (chapter) => String(chapter._id) === chapterId
    );

    if (!chapter) {
      return { error: "指定したIDのチャプターが見つかりませんでした。" };
    }

    return { chapter, book };
  } catch (err) {
    console.error("チャプターの検索に失敗しました。", err);
    return { error: "チャプターの検索に失敗しました。" };
  }
};
