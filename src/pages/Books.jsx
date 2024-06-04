import { useEffect, useState } from "react";
import bookApi from "../api/book";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import Button from "../components/ui/Button";
import React from "react";

const mainStyle = css`
  width: 1080px;
  margin: 0 auto;

  h1 {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 2rem;
  }

  h2 {
    padding-top: 2rem;
    padding-left: 2rem;
    font-size: 1.2rem;
  }
`;

const divStyle = css`
  display: flex;
  padding: 4rem;
`;

const bookStyle = css`
  width: 180px;
  height: 240px;
  border: none;
  background: #f8f9fa;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 0 18px 23px rgba(0, 0, 0, 0.2);
  border-end-end-radius: 10px;
  margin-right: 4rem;

  &:hover {
    transform: translateY(-10px);
  }

  &:before {
    content: "";
    position: absolute;
    right: 10px;
    left: 0;
    width: 9%;
    height: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0.2), transparent);
    transition: all 0.3s ease;
  }

  &:after {
    content: "";
    position: absolute;
    top: auto;
    left: 0;
    bottom: 8px;
    width: 100%;
    height: 20px;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.1));
    transition: all 0.3s ease;
  }
`;

const aStyle = css`
  display: flex;
  flex-direction: column;
`;

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const bookData = await bookApi.getAll();
        setBooks(bookData);
      } catch (error) {
        console.error("DBから本の一覧の取得に失敗しました。");
      }
    };

    fetchBooks();
  }, []);

  if (!books) {
    return <p>Loading...</p>;
  }

  return (
    <div css={mainStyle}>
      <h1>メモブックの一覧</h1>
      <div css={divStyle}>
        {books.map((book) => (
          <div>
            <Link
              to={
                book.chapters[0]
                  ? `/${book._id}/${book.chapters[0]._id}`
                  : `/books/${book._id}`
              }
            >
              <div css={bookStyle}>
                <h2>{book.title}</h2>
              </div>
            </Link>
            <div css={aStyle}>
              <Link to={`/edit/${book._id}`}><Button color="blue">編集</Button></Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
