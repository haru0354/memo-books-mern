import { findChapterById } from "./findChapterById.mjs";

export const findContentsById = async (bookId, chapterId, contentsId) => {
  try {
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
  } catch (err) {
    console.error("コンテンツの検索に失敗しました。", err);
    return { error: "コンテンツの検索に失敗しました。" };
  }
};
