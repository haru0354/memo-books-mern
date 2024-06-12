import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchChapters } from "../store/slice/chaptersSlice";
import { fetchContents } from "../store/slice/contentsSlice";
import { useDispatch, useSelector } from "react-redux";
import ContentsArea from "../components/ContentsArea";
import ChapterList from "../components/ChapterList";
import { main2ColumnStyle } from "../styles/styles";
import { css } from "@emotion/react";

const loadingStyle = css`
  text-align: center;
`;

const Chapter = () => {
  const { bookId, chapterId } = useParams();
  const dispatch = useDispatch();
  const chaptersStatus = useSelector((state) => state.chapters.status);
  const contentsStatus = useSelector((state) => state.contents.status);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchChapters(bookId));
  }, [dispatch, bookId]);

  useEffect(() => {
    dispatch(fetchContents({ bookId, chapterId }));
  }, [dispatch, bookId, chapterId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (
    isLoading ||
    chaptersStatus === "loading" ||
    contentsStatus === "loading"
  ) {
    return <p css={loadingStyle}>Loading ...</p>;
  }

  return (
    <div css={main2ColumnStyle}>
      <ChapterList
        bookId={bookId}
      />
      <ContentsArea
        bookId={bookId}
        chapterId={chapterId}
      />
    </div>
  );
};

export default Chapter;
