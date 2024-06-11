import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import AddChapterModal from "./chapter/AddChapterModal";
import EditChapterModal from "./chapter/EditChapterModal";
import { memo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const sidebarStyles = css`
  position: fixed;
  left: 0;
  top: 0;
  width: 200px;
  max-width: 200px;
  height: 100%;
  border-right: 1px solid gray;
  background-color: rgb(55 65 81);
  padding-left: 10px;
  padding-right: 10px;
  overflow-y: auto;
  z-index: 10;
  transition: transform 0.3s ease;

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

  @media (max-width: 768px) {
    width: 100%;
    max-width: 90vw;
    transform: translateX(-100%);
    
    &::-webkit-transform {
      transform: translateX(-100%);
    }
  }
`;

const booksBackStyle = css`
  text-align: center;
  margin-top: 0;
  padding-top: 9px;
  padding-bottom: 9px;
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

const hamburgerButtonStyle = css`
  position: fixed;
  cursor: pointer;
  top: 0px;
  left: 0px;
  z-index: 20;
  width: 50px;
  height: 50px;
  background-color: #5c5c5c;
  color: #e3e3e3;
  border: none;
  border-radius: 4px;

  @media (min-width: 768px) {
    display: none;
  }
`;

const hamburgerButtonText = css`
  font-size: 0.7rem;
`;

const sidebarOpen = css`
  transform: translateX(0) !important;

  @media (min-width: 767px) {
    transform: translateX(-100%);
  }
`;

const sidebarClosed = css`
  @media (max-width: 767px) {
    transform: translateX(-100%);
  }
`;

const ChapterList = ({ bookId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const chapters = useSelector((state) => state.chapters.chapters);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div css={[sidebarStyles, isOpen ? sidebarOpen : sidebarClosed]}>
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
        <AddChapterModal />
      </div>
      <button css={hamburgerButtonStyle} onClick={toggleSidebar}>
        {isOpen ? (
          <FontAwesomeIcon icon={faXmark} />
        ) : (
          <>
            <FontAwesomeIcon icon={faBars} />
            <span css={hamburgerButtonText}>MENU</span>
          </>
        )}
      </button>
    </>
  );
};

export default memo(ChapterList);
