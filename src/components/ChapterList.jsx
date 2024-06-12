import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import AddChapterModal from "./chapter/AddChapterModal";
import EditChapterModal from "./chapter/EditChapterModal";
import { memo } from "react";

const sidebarStyles = css`
  position: fixed;
  width: 200px;
  max-width: 200px;
  height: 100%;
  border-right: 1px solid gray;
  background-color: rgb(55 65 81);
  padding-left: 10px;
  padding-right: 10px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px; 
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1; 
  }

  &::-webkit-scrollbar-thumb {
    background: #6c6969; 
  }

  a {
    text-decoration: inherit;
    color: white;
  }
`;

const booksBackStyle = css`
  text-align: center;
  margin-top: 0;
  padding-top: 6px;
  padding-bottom: 6px;
  border-bottom: 1px dashed gray;

  &:hover {
    background-color: #7e7979;
  }
`;

const bookTitleStyle = css`
  word-wrap: break-word;
  padding: 8px;
  border-bottom: 1px solid gray;
  margin-top: 30px;
  color: white;
  text-align: center;
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
  word-break: break-all;
  width: 100%;
  height: 100%;
  margin-right: 10px;
  padding: 8px;
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
            <li css={liStyles} key={chapter._id}>
              <Link to={`/${bookId}/${chapter._id}`} css={linkStyles}>
                {chapter.chapter_title}
              </Link>
              <EditChapterModal
                bookId={bookId}
                chapterId={chapter._id}
                chapterTitle={chapter.chapter_title}
              />
            </li>
          );
        })}
      </ul>
      <AddChapterModal bookId={bookId} />
    </div>
  );
};

export default memo(ChapterList);
