import { useEffect, useState } from "react";
import chapterApi from "../api/chapter";
import { useParams } from "react-router-dom";
import ContentsArea from "../components/ContentsArea";
import ChapterList from "../components/ChapterList";
import { main2ColumnStyle } from "../styles/styles";

const Chapter = () => {
  const [chapter, setChapter] = useState();
  const { chapterId } = useParams();
  const { bookId } = useParams();

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const data = await chapterApi.get(bookId, chapterId);
        setChapter(data);
      } catch (error) {
        console.error("DBから本の取得に失敗しました。");
      }
    };
    fetchChapter();
  }, [chapterId, bookId]);

  if (!chapter) {
    return <p>Loading...</p>;
  }

  return (
    <main css={main2ColumnStyle}>
      <ChapterList chapters={chapter.bookChapters} bookId={bookId} />
      <ContentsArea chapter={chapter.chapter} bookId={bookId}/>
    </main>
  );
};

export default Chapter;
