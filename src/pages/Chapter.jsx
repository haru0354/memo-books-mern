import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContentsArea from "../components/ContentsArea";
import ChapterList from "../components/ChapterList";
import { main2ColumnStyle } from "../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { fetchChapters } from "../store/slice/chaptersSlice";

const Chapter = () => {
  const [chapter, setChapter] = useState(null);
  const { chapterId } = useParams();
  const { bookId } = useParams();
  const dispatch = useDispatch();
  const chapters = useSelector((state) => state.chapters.chapters);
  const status = useSelector((state) => state.chapters.status);

  useEffect(() => {
    dispatch(fetchChapters(bookId));
  }, [dispatch, bookId]);

  useEffect(() => {
    if (status === "succeeded" && chapters.length > 0 && chapterId) {
      const foundChapter = chapters.find((chapter) => chapter._id === chapterId);
      setChapter(foundChapter);
    }
  }, [chapters, chapterId, status]);

  if (status === "loading") {
    return <p>Loading ...</p>;
  }

  if (!chapter) {
    return <p>チャプターが見つかりませんでした。</p>;
  }

  return (
    <main css={main2ColumnStyle}>
      <ChapterList chapters={chapters} bookId={bookId} />
      <ContentsArea chapter={chapter} bookId={bookId} />
    </main>
  );
};

export default Chapter;
