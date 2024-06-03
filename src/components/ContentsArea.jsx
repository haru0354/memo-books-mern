import { css } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { RightContent } from "../styles/styles";
import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "./ui/Button";
import TextInput from "./ui/TextInput";
import Textarea from "./ui/Textarea";
import AddContentModal from "./content/AddContentModal";
import EditChapterModal from "./chapter/EditChapterModal";

const tableOfContentsStyle = css`
  max-width: 380px;
  margin: 0 auto;
  padding: 0.2rem 2rem;
  border: 1px solid #cbc9c9;
  border-radius: 4px;

  p {
    text-align: center;
    border-bottom: 1px dotted #898989;
    padding-bottom: 4px;
  }

  li {
    color: #1168ca;
    margin-right: 0px;
    margin-bottom: 1rem;
    cursor: pointer;

    &:hover {
      color: #ff2300;
    }

    svg {
      margin-right: 16px;
    }
  }
`;

const contentAreaStyle = css`
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px dotted gray;
`;

const h2Styles = css`
  font-size: 1.4rem;
  margin-bottom: 20px;
`;

const editContainerStyle = css`
  display: flex;
  flex-direction: column;
`;

const editButtonContainerStyle = css`
  display: flex;
  justify-content: space-between;
`;

const ContentsArea = ({ contents, bookId, chapterId, chapterTitle }) => {
  const [editingContentId, setEditingContentId] = useState(null);

  const toggleEditContents = (contentId) => {
    setEditingContentId(editingContentId === contentId ? null : contentId);
  };

  if (!contents) {
    return <p>Loading...</p>;
  }

  const scrollToTitle = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div css={RightContent}>
      <h1>{chapterTitle}</h1>
      <div css={tableOfContentsStyle}>
        <p>目次</p>
        <ul>
          {contents.map((content) => {
            return (
              <li key={content._id} onClick={() => scrollToTitle(content._id)}>
                <FontAwesomeIcon icon={faChevronDown} />
                {content.heading_title}
              </li>
            );
          })}
        </ul>
      </div>
      <EditChapterModal bookId={bookId} chapterId={chapterId} chapterTitle={chapterTitle}/>
      {contents.map((content) => {
        const isEditing = editingContentId === content._id;

        return (
          <div css={contentAreaStyle} id={content._id} key={content._id}>
            {isEditing ? (
              <div css={editContainerStyle}>
                <TextInput label="タイトル" />
                <Textarea label="コンテンツ " />
                <Button color="blue">追加する</Button>
                <Button
                  color="gray"
                  onClick={() => toggleEditContents(content._id)}
                >
                  キャンセル
                </Button>
              </div>
            ) : (
              <>
                <div css={editButtonContainerStyle}>
                  <h2 css={h2Styles}>{content.heading_title}</h2>
                  <Button
                    color="blue"
                    onClick={() => toggleEditContents(content._id)}
                  >
                    編集
                  </Button>
                </div>
                {content.content}
              </>
            )}
          </div>
        );
      })}
      <AddContentModal bookId={bookId} chapterId={chapterId} />
    </div>
  );
};

export default ContentsArea;
