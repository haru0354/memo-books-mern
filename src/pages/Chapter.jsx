import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchChapters } from "../store/slice/chaptersSlice";
import { fetchContents } from "../store/slice/contentsSlice";
import { useDispatch, useSelector } from "react-redux";
import ContentsArea from "../components/ContentsArea";
import ChapterList from "../components/ChapterList";
import { main2ColumnStyle } from "../styles/styles";

const Chapter = () => {
  const { bookId, chapterId } = useParams();
  const dispatch = useDispatch();
  const chapters = useSelector((state) => state.chapters.chapters);
  const contents = useSelector((state) => state.contents.contents)
  const chaptersStatus = useSelector((state) => state.chapters.status);
  const contentsStatus = useSelector((state) => state.contents.status);

  useEffect(() => {
    dispatch(fetchChapters(bookId));
  }, [dispatch, bookId, chapterId]);

  useEffect(() => {
    dispatch(fetchContents({bookId, chapterId}));
  }, [dispatch, bookId, chapterId]);

  if (chaptersStatus === "loading" || contentsStatus === "loading") {
    return <p>Loading ...</p>;
  }
  const chapterTitle = chapters.find((chapter) => chapter._id === chapterId)?.chapter_title || '';

  return (
    <main css={main2ColumnStyle}>
      <ChapterList chapters={chapters} bookId={bookId} />
      <ContentsArea contents={contents} bookId={bookId} chapterId={chapterId} chapterTitle={chapterTitle} />
    </main>
  );
};

export default Chapter;
