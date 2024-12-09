import { memo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { css } from "@emotion/react";
import { modalBackStyle } from "../../styles/styles";
import AddButton from "../ui/AddButton";
import EditImageButton from "../ui/EditImageButton";
import AddChapterModal from "../chapter/AddChapterModal";
import EditChapterModal from "../chapter/EditChapterModal";
import Page404 from "../../pages/Page404";

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
    transform: translateX(-100%);

    &::-webkit-transform {
      transform: translateX(-100%);
    }
  }
`;

const booksBackStyle = css`
  margin: 0px;
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: center;

  &:hover {
    background-color: #7e7979;
  }
`;

const bookTitleStyle = css`
  word-wrap: break-word;
  padding: 30px 8px;
  margin-top: 0;
  margin-bottom: 0;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  color: white;
  text-align: center;
`;

const ulStyles = css`
  padding: 0;
  margin-top: 5px;
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

const logoCss = css`
  width: 100%;

  @media (max-width: 767px) {
    width: 70%;
    margin-left: 45px;
  }
`;

const Sidebar = ({ bookId }) => {
  const [isHumBergerMenuOpen, setIsHumBergerMenuOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingChapterId, setEditingChapterId] = useState(null);
  const [editingChapterTitle, setEditingChapterTitle] = useState("");
  const chapters = useSelector((state) => state.chapters.chapters);
  const chaptersStatus = useSelector((state) => state.chapters.status);
  const bodyRef = useRef(document.body);

  const disableScroll = () => {
    bodyRef.current.style.overflowY = "hidden";
  };

  const enableScroll = () => {
    bodyRef.current.style.overflow = "auto";
  };

  const toggleHumBergerMenu = () => {
    setIsHumBergerMenuOpen((prev) => !prev);
  };

  const toggleOpenAddModal = () => {
    setIsAddModalOpen((prev) => !prev);
    disableScroll();
  };

  const toggleCloseAddModal = () => {
    setIsAddModalOpen((prev) => !prev);
    enableScroll();
  };

  const closeAddModal = (e) => {
    if (e.target === e.currentTarget) {
      toggleCloseAddModal();
    }
  };

  const toggleOpenEditModal = (chapterId, chapterTitle) => {
    setEditingChapterId(chapterId);
    setEditingChapterTitle(chapterTitle);
    setIsEditModalOpen((prev) => !prev);
    disableScroll();
  };

  const toggleCloseEditModal = () => {
    setIsEditModalOpen((prev) => !prev);
    enableScroll();
  };

  const closeEditModal = (e) => {
    if (e.target === e.currentTarget) {
      toggleCloseEditModal();
    }
  };

  if (chaptersStatus === "failed") {
    return <Page404 />;
  }

  return (
    <>
      <div
        css={[sidebarStyles, isHumBergerMenuOpen ? sidebarOpen : sidebarClosed]}
      >
        <Link to="/">
          <img src="/logo.png" alt="メモブックノート" css={logoCss} />
        </Link>
        <h2 css={bookTitleStyle}>{chapters.bookTitle}</h2>
        <Link to="/books">
          <p css={booksBackStyle}>メモブックの一覧</p>
        </Link>
        <ul css={ulStyles}>
          {chapters.chaptersWithoutContents.map((chapter) => {
            return (
              <li css={liStyles} key={chapter._id}>
                <Link to={`/${bookId}/${chapter._id}`} css={linkStyles}>
                  {chapter.chapter_title}
                </Link>
                <EditImageButton
                  onClick={() =>
                    toggleOpenEditModal(chapter._id, chapter.chapter_title)
                  }
                />
              </li>
            );
          })}
        </ul>
        <AddButton onClick={toggleOpenAddModal} />
      </div>
      <button css={hamburgerButtonStyle} onClick={toggleHumBergerMenu}>
        {isHumBergerMenuOpen ? (
          <FontAwesomeIcon icon={faXmark} />
        ) : (
          <>
            <FontAwesomeIcon icon={faBars} />
            <span css={hamburgerButtonText}>MENU</span>
          </>
        )}
      </button>
      {isAddModalOpen && (
        <div css={modalBackStyle} onClick={closeAddModal}>
          <AddChapterModal
            bookId={bookId}
            toggleCloseAddModal={toggleCloseAddModal}
            toggleHumBergerMenu={toggleHumBergerMenu}
          />
        </div>
      )}
      {isEditModalOpen && (
        <div css={modalBackStyle} onClick={closeEditModal}>
          <EditChapterModal
            bookId={bookId}
            chapterId={editingChapterId}
            chapterTitle={editingChapterTitle}
            toggleCloseEditModal={toggleCloseEditModal}
          />
        </div>
      )}
    </>
  );
};

export default memo(Sidebar);
