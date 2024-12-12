import { findChapterById } from "../helpers/findChapterById.mjs";
import { findContentsById } from "../helpers/findContentsById.mjs";
import { validationResult } from "express-validator";
import { verifyToken } from "../helpers/verifyToken.mjs";

export const getAllContents = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "トークンが付与されていません。" });
  }

  let userId;
  try {
    const decodedToken = await verifyToken(token);
    userId = decodedToken.uid;
  } catch (err) {
    console.error("トークンの検証に失敗しました", err.name);
    return res.status(401).json({ message: "トークンの検証に失敗しました。" });
  }

  const bookId = req.params.bookId;
  const chapterId = req.params.chapterId;

  const { chapter, error } = await findChapterById(userId, bookId, chapterId);

  if (error) {
    return res.status(404).json({ message: error });
  }

  const contents = chapter.contents;
  const chapterTitle = chapter.chapter_title;

  try {
    res.json({ contents, chapterTitle });
  } catch (err) {
    console.error("全てのコンテンツを取得するのに失敗しました", err);
    return res
      .status(500)
      .json({ message: "全てのコンテンツを取得するのに失敗しました。" });
  }
};

export const getContents = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "トークンが付与されていません。" });
  }

  let userId;
  try {
    const decodedToken = await verifyToken(token);
    userId = decodedToken.uid;
  } catch (err) {
    console.error("トークンの検証に失敗しました", err.name);
    return res.status(401).json({ message: "トークンの検証に失敗しました。" });
  }

  const bookId = req.params.bookId;
  const chapterId = req.params.chapterId;
  const contentsId = req.params.contentsId;

  const { contents, error } = await findContentsById(
    userId,
    bookId,
    chapterId,
    contentsId
  );

  if (error) {
    return res.status(404).json({ message: error });
  }

  try {
    res.json(contents);
  } catch (err) {
    console.error("個別のコンテンツを取得するのに失敗しました", err);
    return res
      .status(500)
      .json({ message: "個別のコンテンツを取得するのに失敗しました。" });
  }
};

export const addContents = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errs = errors.array();
    return res.status(400).json(errs);
  }

  const bookId = req.params.bookId;
  const chapterId = req.params.chapterId;
  const userId = req.params.userId;

  const { chapter, book, error } = await findChapterById(
    userId,
    bookId,
    chapterId
  );

  if (error) {
    res.status(404).json({ message: error });
  }

  const { heading_title, content } = req.body;

  if (!heading_title || !content) {
    return res
      .status(400)
      .json({ message: "heading_titleとcontentは必須です。" });
  }

  const newContents = {
    heading_title,
    content,
  };

  chapter.contents.push(newContents);
  await book.save();

  const savedContents = chapter.contents[chapter.contents.length - 1];
  res.status(201).json(savedContents);
};

export const updateContents = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errs = errors.array();
    return res.status(400).json(errs);
  }

  const bookId = req.params.bookId;
  const chapterId = req.params.chapterId;
  const contentsId = req.params.contentsId;
  const userId = req.params.userId;

  const { contents, book, error } = await findContentsById(
    userId,
    bookId,
    chapterId,
    contentsId
  );

  if (error) {
    return res.status(404).json({ message: error });
  }

  const { heading_title, content } = req.body;

  if (heading_title !== undefined) {
    contents.heading_title = heading_title;
  }

  if (content !== undefined) {
    contents.content = content;
  }

  await book.save();
  res.status(200).json(contents);
};

export const deleteContents = async (req, res) => {
  const bookId = req.params.bookId;
  const chapterId = req.params.chapterId;
  const contentsId = req.params.contentsId;
  const userId = req.params.userId;

  const { chapter, book, error } = await findContentsById(
    userId,
    bookId,
    chapterId,
    contentsId
  );

  if (error) {
    return res.status(404).json({ message: error });
  }

  chapter.contents = chapter.contents.filter(
    (content) => String(content._id) !== contentsId
  );

  await book.save();
  res.json({
    message: "コンテンツの削除に成功しました。",
    deletedContentsId: contentsId,
  });
};
