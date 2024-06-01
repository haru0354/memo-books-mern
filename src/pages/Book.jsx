import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import bookApi from "../api/book";
import ChapterList from "../components/ChapterList";
import { RightContent, main2ColumnStyle } from "../styles/styles";
import { formatDate } from "../lib/formatDate";
import { css } from "@emotion/react";

const h2Style = css`
  margin-top: 4rem;
  margin-bottom: 2rem;
`;

const Book = () => {
  const [book, setBook] = useState();
  const { bookId } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await bookApi.get(bookId);
        setBook(data);
      } catch (error) {
        console.error("DBから本の取得に失敗しました。");
      }
    };

    fetchBook();
  }, [bookId]);

  if (!book) {
    return <p>Loading...</p>;
  }

  const formattedCreatedDate = formatDate(book.createdAt);
  const formattedUpdatedDate = formatDate(book.updatedAt);

  return (
    <main css={main2ColumnStyle}>
      <ChapterList chapters={book.chapters} bookId={book._id} />
      <div css={RightContent}>
        <h1>{book.title}</h1>
        <p>本の作成日：{formattedCreatedDate}</p>
        <p>最終更新日：{formattedUpdatedDate}</p>
        <h2 css={h2Style}>本の詳細</h2>
        {book.description}
      </div>
    </main>
  );
};

export default Book;
