import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import AddChapterModal from "./chapter/AddChapterModal";
import EditChapterModal from "./chapter/EditChapterModal";

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

const ulStyles = css`
  padding: 0;
  padding: 10px 0;
`;

const liStyles = css`
  display: flex;
  align-items: center;
`;

const linkStyles = css`
  width: 100%;
  height: 100%;

  margin-right: 10px;
  padding: 8px;
  &:hover {
    background-color: #7e7979;
  }
`;

const bookTitleStyle = css`
  padding: 8px;
  border-bottom: 1px solid gray;
  margin-top: 30px;
  color: white;
  text-align: center;
`;

const booksBackStyle = css`
  text-align: center;
  margin-top: 0;
  padding-bottom: 6px;
  border-bottom:1px dashed gray;

  &:hover {
   background-color: #7e7979;
  }
`;

const ChapterList = ({ bookId }) => {
  const chapters = useSelector((state) => state.chapters.chapters);
  return (
    <div css={sidebarStyles}>
      <Link to="/books">
       <p css={booksBackStyle}>本の一覧へ</p> 
      </Link>
      <h2 css={bookTitleStyle}>{chapters.bookTitle}</h2>
      <ul css={ulStyles}>
        {chapters.chaptersWithoutContents.map((chapter) => {
          return (
            <>
              <li css={liStyles}>
                <Link to={`/${bookId}/${chapter._id}`} css={linkStyles}>
                  {chapter.chapter_title}
                </Link>
                <EditChapterModal
                  bookId={bookId}
                  chapterId={chapter._id}
                  chapterTitle={chapter.chapter_title}
                />
              </li>
            </>
          );
        })}
      </ul>
      <AddChapterModal bookId={bookId} />
    </div>
  );
};

export default ChapterList;
