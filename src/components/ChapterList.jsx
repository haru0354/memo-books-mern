import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import AddChapterModal from "./chapter/AddChapterModal";

const sidebarStyles = css`
  width: 200px;
  max-width: 200px;
  border-right: 1px solid gray;
  background-color: rgb(55 65 81);
  padding: 10px;

  a {
    text-decoration: inherit;
    color: white;
  }
`;

const liStyles = css`
  padding: 8px;

  &:hover {
    background-color: #696c72;
  }
`;

const bookTitleStyle = css`
  padding: 8px;
  border-bottom: 1px solid gray;
  margin-bottom: 30px;
  color: white;
  text-align: center;
`;

const ChapterList = ({ bookId }) => {
  const chapters = useSelector((state) => state.chapters.chapters);

  return (
    <div css={sidebarStyles}>
      <ul>
        <li css={bookTitleStyle}>{chapters.bookTitle}</li>
        <Link to="/books">
          <li css={liStyles}>本の一覧へ</li>
        </Link>
        {chapters.chaptersWithoutContents.map((chapter) => {
          return (
            <Link to={`/${bookId}/${chapter._id}`} key={chapter._id}>
              <li css={liStyles}>{chapter.chapter_title}</li>
            </Link>
          );
        })}
      </ul>
      <AddChapterModal bookId={bookId} />
    </div>
  );
};

export default ChapterList;
