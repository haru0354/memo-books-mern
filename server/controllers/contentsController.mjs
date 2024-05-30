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
