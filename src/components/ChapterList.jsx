import AddModal from "./AddModal";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";

const sidebarStyles = css`
  max-width: 180px;
  border-right: 1px solid gray;
  background-color: rgb(55 65 81);;
  padding: 10px;
  
  a {
    font-weight: 500;
    color: white;
    text-decoration: inherit;

    &:hover {
      color: #f5a06f;
    }
  }
`;

const ChapterList = ({ chapters, bookId }) => {
  return (
    <div css={sidebarStyles}>
      <ul>
        <li>
          <Link to="/books">本の一覧へ</Link>
        </li>
        <li>
          <Link to={`/books/${bookId}`}>本の詳細へ</Link>
        </li>
        {chapters.map((chapter) => {
          return (
            <li key={chapter._id}>
              <Link to={`/${bookId}/${chapter._id}`}>
                {chapter.chapter_title}
              </Link>
            </li>
          );
        })}
        <AddModal />
      </ul>
    </div>
  );
};

export default ChapterList;
