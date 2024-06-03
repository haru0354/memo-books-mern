import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import Button from "./ui/Button";
import TextInput from "./ui/TextInput";
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
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditChapter = () => {
    setIsEditing((prev) => !prev);
  };

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
            <React.Fragment key={chapter._id}>
              {isEditing ? (
                <TextInput />
              ) : (
                <Link to={`/${bookId}/${chapter._id}`} key={chapter._id}>
                  <li>{chapter.chapter_title}</li>
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </ul>
      {isEditing && <Button color="blue">保存</Button>}
      <Button color="gray" onClick={toggleEditChapter}>
        {isEditing ? "キャンセル" : "編集"}
      </Button>
      <AddChapterModal bookId={bookId} />
    </div>
  );
};

export default ChapterList;
