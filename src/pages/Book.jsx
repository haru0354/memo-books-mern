import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import bookApi from "../api/book";
import ChapterList from "../components/ChapterList";

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

  return (
    <>
      <div>本の詳細ページ(book)</div>
      <h1>{book.title}</h1>
      {book.description && (
        <p>{book.description}</p>
      )}
      <ChapterList chapters={book.chapters} bookId={book._id} />
    </>
  );
};

export default Book;
