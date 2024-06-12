import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchChapters } from "../store/slice/chaptersSlice";
import { useDispatch, useSelector } from "react-redux";
import ChapterList from "../components/ChapterList";
import { main2ColumnStyle } from "../styles/styles";
import { css } from "@emotion/react";
import AddChapterForm from "../components/AddChapterForm";

const loadingStyle = css`
  text-align: center;
`;

const Book = () => {
  const { bookId } = useParams();
  const dispatch = useDispatch();
  const chaptersStatus = useSelector((state) => state.chapters.status);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchChapters(bookId));
  }, [dispatch, bookId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (
    isLoading ||
    chaptersStatus === "loading" 
  ) {
    return <p css={loadingStyle}>Loading ...</p>;
  }

  return (
    <div css={main2ColumnStyle}>
      <ChapterList
        bookId={bookId}
      />      
      <AddChapterForm bookId={bookId}/>
    </div>
  );
};

export default Book;
