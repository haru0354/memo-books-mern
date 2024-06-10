import Book from "../models/book.mjs";

export const findChapterById = async (userId, bookId, chapterId) => {
  const book = await Book.findOne({ _id: bookId, userId });

    if (!book) {
      return { error: "指定した本が見つかりませんでした。" };
    }

    const chapter = book.chapters.find(
      (chapter) => String(chapter._id) === chapterId
    );

    if (!chapter) {
      return { error: "指定したIDのチャプターが見つかりませんでした。" };
    }

    const bookChapters = book.chapters.map(chapter => ({
      _id: chapter._id,
      chapter_title: chapter.chapter_title
    }));
    
    return { bookChapters, chapter, book, };
};
