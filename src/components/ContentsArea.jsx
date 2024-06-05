import { css } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { RightContent, formStyle } from "../styles/styles";
import { useState } from "react";
import Button from "./ui/Button";
import TextInput from "./ui/TextInput";
import Textarea from "./ui/Textarea";
import AddContentModal from "./content/AddContentModal";
import EditChapterModal from "./chapter/EditChapterModal";
import contentApi from "../api/content";
import { useDispatch, useSelector } from "react-redux";
import { fetchContentById, updateContents } from "../store/slice/contentsSlice";
import DeleteContentModal from "./content/DeleteContentModal";
import EditImageButton from "./ui/EditImageButton";

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

const cancelButtonStyle = css`
  margin: 0 40px;
`;

const editingButtonContainerStyle = css`
  display: flex;
  justify-content: center;
`;

const aStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentsArea = ({ bookId, chapterId }) => {
  const [editingContentId, setEditingContentId] = useState(null);
  const [title, setTitle] = useState("");
  const [contentValue, setContentValue] = useState("");
  const dispatch = useDispatch();
  const contents = useSelector((state) => state.contents.contents);
  const chapterTitle = useSelector((state) => {
    const chapter = state.chapters.chapters.chaptersWithoutContents.find(
      (chapter) => chapter._id === chapterId
    );
    return chapter ? chapter.chapter_title : null;
  });

  if (!chapterTitle) {
    return <p>チャプターが見つかりませんでした</p>;
  }

  if (!contents) {
    return <p>Loading...</p>;
  }

  const toggleEditContents = (contentId) => {
    setEditingContentId(editingContentId === contentId ? null : contentId);
  };

  const scrollToTitle = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleSubmit = async (e, content) => {
    e.preventDefault();

    const formData = {};

    if (title) {
      formData.heading_title = title;
    }

    if (contentValue) {
      formData.content = contentValue;
    }

    try {
      const response = await contentApi.patch(
        bookId,
        chapterId,
        content._id,
        formData
      );
      dispatch(updateContents(response));
      dispatch(fetchContentById({ bookId, chapterId, contentId: content._id }));
      setContentValue("");
      setTitle("");
      toggleEditContents(content._id);
    } catch (error) {
      console.error("コンテンツの編集に失敗しました。");
    }
  };

  return (
    <div css={RightContent}>
        <h1>{chapterTitle}</h1>
      <div css={tableOfContentsStyle}>
        <p>目次</p>
        <ul>
          {contents.contents.map((content) => {
            return (
              <li key={content._id} onClick={() => scrollToTitle(content._id)}>
                <FontAwesomeIcon icon={faChevronDown} />
                {content.heading_title}
              </li>
            );
          })}
        </ul>
      </div>
      {contents.contents.map((content) => {
        const isEditing = editingContentId === content._id;

        return (
          <div css={contentAreaStyle} id={content._id} key={content._id}>
            {isEditing ? (
              <div css={editContainerStyle}>
                <form
                  css={formStyle}
                  onSubmit={(e) => handleSubmit(e, content)}
                >
                  <TextInput
                    label="タイトル"
                    value={title || content.heading_title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <Textarea
                    label="コンテンツ"
                    value={contentValue || content.content}
                    onChange={(e) => setContentValue(e.target.value)}
                  />
                  <div css={editingButtonContainerStyle}>
                    <Button type="submit" color="blue">
                      保存
                    </Button>
                    <Button
                      type="button"
                      addCss={cancelButtonStyle}
                      color="gray"
                      onClick={() => toggleEditContents(content._id)}
                    >
                      キャンセル
                    </Button>
                  </div>
                </form>
                <DeleteContentModal
                  bookId={bookId}
                  chapterId={chapterId}
                  contentId={content._id}
                  contentTitle={content.heading_title}
                />
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
