import { findChapterById } from "./findChapterById.mjs";

export const findContentsById = async (bookId, chapterId, contentsId) => {
  const { chapter, book, error } = await findChapterById(bookId, chapterId);

  if (error) {
    return { error };
  }

  const contents = chapter.contents.find(
    (content) => String(content._id) === contentsId
  );

  if (!contents) {
    return { error: "指定したIDのコンテンツが見つかりませんでした。" };
  }

  return { contents, chapter, book };
};
