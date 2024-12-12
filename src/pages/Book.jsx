import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { fetchChapters } from "../store/slice/chaptersSlice";
import { css } from "@emotion/react";
import { main2ColumnStyle } from "../styles/styles";
import Sidebar from "../components/layout/Sidebar";
import AddChapterForm from "../components/chapter/AddChapterForm";
import Page404 from "./Page404";

const loadingStyle = css`
  text-align: center;
`;

const Book = () => {
  const { bookId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const chaptersStatus = useSelector((state) => state.chapters.status);
  const bookTitle = useSelector((state) => state.chapters.chapters.bookTitle);
  const userId = useSelector((state) => state.user.user.uid);

  useEffect(() => {
    dispatch(fetchChapters({ bookId })).unwrap();
  }, [dispatch, bookId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading || chaptersStatus === "loading") {
    return <p css={loadingStyle}>Loading ...</p>;
  }
  
  if (chaptersStatus === "failed") {
    return <Page404 />;
  }

  return (
    <>
      <Helmet>
        <title>{bookTitle}のチャプターの登録ページ | メモブックノート</title>
        <meta
          name="description"
          content={`${bookTitle}のチャプターの登録をすることが可能です。ブックメモに登録をした本のチャプターを全て削除した時に表示されます。ブックメモでは本にチャプターの登録をして様々なメモを追加して閲覧をすることができます。`}
        />
        <meta name="robots" content="noindex" />
      </Helmet>
      <div css={main2ColumnStyle}>
        <Sidebar bookId={bookId} />
        <AddChapterForm bookId={bookId} />
      </div>
    </>
  );
};

export default Book;
