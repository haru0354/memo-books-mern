import Book from "../models/book.mjs";

export const findChapterById = async (bookId, chapterId) => {
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
};
