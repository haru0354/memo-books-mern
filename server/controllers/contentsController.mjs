import { findChapterById } from "../helpers/findChapterById.mjs";

export const getAllContents = async (req, res) => {
    try {
        const bookId = req.params.id
        const chapterId = req.params.chapterId
    
        const { chapter, error } = await findChapterById(bookId, chapterId)

        if (error) {
            res.status(404).json({ message: error })
        }

        const contents =  chapter.contents
        res.json(contents)
    } catch (err) {
        console.error("コンテンツの取得に失敗しました。", err);
        res.status(500).json({ message: "コンテンツの取得に失敗しました。"})
    }
}

export const addContents = async (req, res) => {
    try {
        const bookId = req.params.id
        const chapterId = req.params.chapterId
    
        const { chapter, book, error } = await findChapterById(bookId, chapterId)
    
        if (error) {
            res.status(404).json({ message: error })
        }
    
        const { heading_title, content } = req.body;
    
        if (!heading_title || !content) {
          return res.status(400).json({ message: "heading_titleとcontentは必須です。" });
        }
    
        const newContents = {
          heading_title,
          content,
        };
    
        chapter.contents.push(newContents);
        await book.save();
        res.status(201).json(newContents)
    } catch (err) {
        console.error("コンテンツの追加に失敗しました。", err);
        res.status(500).json({ message: "コンテンツの追加に失敗しました。"})
    }
}