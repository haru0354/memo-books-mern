import { findChapterById } from "../helpers/findChapterById.mjs";
import { findContentsById } from "../helpers/findContentsById.mjs";
import { validationResult } from "express-validator";

export const getAllContents = async (req, res) => {
  const bookId = req.params.id;
  const chapterId = req.params.chapterId;

  const { chapter, error } = await findChapterById(bookId, chapterId);

  if (error) {
    return res.status(404).json({ message: error });
  }

  const contents = chapter.contents;
  res.json(contents);
};

export const getContents = async (req, res) => {
  const bookId = req.params.id;
  const chapterId = req.params.chapterId;
  const contentsId = req.params.contentsId;

  const { contents, error } = await findContentsById(
    bookId,
    chapterId,
    contentsId
  );

  if (error) {
    return res.status(404).json({ message: error });
  }

  res.json(contents);
};

export const addContents = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errs = errors.array();
    return res.status(400).json(errs);
  }

  const bookId = req.params.id;
  const chapterId = req.params.chapterId;

  const { chapter, book, error } = await findChapterById(bookId, chapterId);

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
  res.status(201).json(newContents);
};

export const updateContents = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errs = errors.array();
    return res.status(400).json(errs);
  }

  const bookId = req.params.id;
  const chapterId = req.params.chapterId;
  const contentsId = req.params.contentsId;

  const { contents, book, error } = await findContentsById(
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
  const bookId = req.params.id;
  const chapterId = req.params.chapterId;
  const contentsId = req.params.contentsId;

  const { chapter, book, error } = await findContentsById(
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
  res.json({ message: "コンテンツの削除に成功しました。" });
};
