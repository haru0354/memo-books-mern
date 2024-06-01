import AddModal from "./AddModal";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";

const sidebarStyles = css`
  width: 180px;
  max-width: 180px;
  border-right: 1px solid gray;
  background-color: rgb(55 65 81);
  padding: 10px;

  a {
    text-decoration: inherit;
    color: white;
  }

  li {
    padding: 8px;

    &:hover {
      background-color: #696c72;
    }
  }
`;

const liStyle = css`
  border-bottom: 1px solid gray;
  margin-bottom: 30px;
`;

const ChapterList = ({ chapters, bookId }) => {
  return (
    <div css={sidebarStyles}>
      <ul>
        <Link to="/books">
          <li>本の一覧</li>
        </Link>
        <Link to={`/books/${bookId}`}>
          <li css={liStyle}>本の詳細</li>
        </Link>
        {chapters.map((chapter) => {
          return (
            <Link to={`/${bookId}/${chapter._id}`} key={chapter._id}>
              <li>{chapter.chapter_title}</li>
            </Link>
          );
        })}
      </ul>
      <AddModal />
    </div>
  );
};

export default ChapterList;
