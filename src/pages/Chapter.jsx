import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async"
import { css } from "@emotion/react";
import { main2ColumnStyle } from "../styles/styles";
import { fetchChapters } from "../store/slice/chaptersSlice";
import { fetchContents } from "../store/slice/contentsSlice";
import ContentsArea from "../components/ContentsArea";
import ChapterList from "../components/ChapterList";

const loadingStyle = css`
  text-align: center;
`;

const Chapter = () => {
  const { bookId, chapterId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const chaptersStatus = useSelector((state) => state.chapters.status);
  const contentsStatus = useSelector((state) => state.contents.status);
  const chapterTitle = useSelector(
    (state) => state.contents.contents.chapterTitle
  );

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
    <>
      <Helmet>
        <title>{chapterTitle} | bookMemo</title>
        <meta
          name="description"
          content={`${chapterTitle}中のコンテンツの一覧ページです。チャプターの中には今までに登録したメモが含まれています。様々なメモを登録したり編集や削除などがこのページでは可能です。PC・スマホ・タブレットなどのあらゆる端末なだけでなく、iphoneやandroidのどちらでも利用が可能です。`}
        ></meta>
      </Helmet>
      <div css={main2ColumnStyle}>
        <ChapterList bookId={bookId} />
        <ContentsArea bookId={bookId} chapterId={chapterId} />
      </div>
    </>
  );
};

export default Chapter;
