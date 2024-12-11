import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { fetchChapters } from "../store/slice/chaptersSlice";
import { fetchContents } from "../store/slice/contentsSlice";
import { useParams } from "react-router-dom";
import { css } from "@emotion/react";
import { main2ColumnStyle } from "../styles/styles";
import MainContent from "../components/layout/MainContent";
import Sidebar from "../components/layout/Sidebar";
import Page404 from "./Page404";

const loadingStyle = css`
  text-align: center;
`;

const Chapter = () => {
  const { bookId, chapterId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const chaptersStatus = useSelector((state) => state.chapters.status);
  const contentsStatus = useSelector((state) => state.contents.status);
  const userId = useSelector((state) => state.user.user.uid)
  const chapterTitle = useSelector(
    (state) => state.contents.contents.chapterTitle
  );

  useEffect(() => {
    dispatch(fetchChapters({bookId})).unwrap();
  }, [dispatch, bookId]);

  useEffect(() => {
    dispatch(fetchContents({userId, bookId, chapterId })).unwrap();
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

  if (
    chaptersStatus === "failed" ||
    contentsStatus === "failed"
  ) {
    return <Page404 />;
  }

  return (
    <>
      <Helmet>
        <title>{chapterTitle} | メモブックノート</title>
        <meta
          name="description"
          content={`${chapterTitle}中のコンテンツの一覧ページです。チャプターの中には今までに登録したメモが含まれています。様々なメモを登録したり編集や削除などがこのページでは可能です。PC・スマホ・タブレットなどのあらゆる端末なだけでなく、iphoneやandroidのどちらでも利用が可能です。`}
        />
        <meta name="robots" content="noindex" />
      </Helmet>
      <div css={main2ColumnStyle}>
        <Sidebar bookId={bookId} />
        <MainContent bookId={bookId} chapterId={chapterId} />
      </div>
    </>
  );
};

export default Chapter;
