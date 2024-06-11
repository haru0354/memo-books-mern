import { css } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { RightContent, formStyle, errorMessageStyle } from "../styles/styles";
import React, { useState } from "react";
import Button from "./ui/Button";
import TextInput from "./ui/TextInput";
import Textarea from "./ui/Textarea";
import AddContentModal from "./content/AddContentModal";
import contentApi from "../api/content";
import { useDispatch, useSelector } from "react-redux";
import { fetchContentById, updateContents } from "../store/slice/contentsSlice";
import DeleteContentModal from "./content/DeleteContentModal";
import EditImageButton from "./ui/EditImageButton";
import { FormProvider, useForm } from "react-hook-form";
import { splitAndNewLines } from "../lib/splitAndNewLines";

const tableOfContentsStyle = css`
  max-width: 380px;
  margin: 2rem auto;
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
  margin: 2rem 0;
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
  align-items: center;
`;

const cancelButtonStyle = css`
  margin: 0 40px;
`;

const editingButtonContainerStyle = css`
  display: flex;
  justify-content: center;
`;

const ContentsArea = ({ bookId, chapterId }) => {
  const [editingContentId, setEditingContentId] = useState(null);
  const dispatch = useDispatch();
  const contents = useSelector((state) => state.contents.contents);
  const chapterTitle = useSelector((state) => {
    const chapter = state.chapters.chapters.chaptersWithoutContents.find(
      (chapter) => chapter._id === chapterId
    );
    return chapter ? chapter.chapter_title : null;
  });
  const methods = useForm();

  if (!chapterTitle) {
    return <p>チャプターが見つかりませんでした</p>;
  }

  if (!contents) {
    return <p>Loading...</p>;
  }

  const toggleEditContents = (contentId) => {
    setEditingContentId(editingContentId === contentId ? null : contentId);
    methods.reset();
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

  const onSubmitContent = async (data, contentId) => {
    const formData = {
      heading_title: data.title,
      content: data.content,
    };

    console.log(contentId);

    try {
      const response = await contentApi.patch(
        bookId,
        chapterId,
        contentId,
        formData
      );
      dispatch(updateContents(response));
      dispatch(fetchContentById({ bookId, chapterId, contentId }));

      methods.reset();
      toggleEditContents(contentId);
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
        const contentId = content._id;
        return (
          <div css={contentAreaStyle} id={content._id} key={content._id}>
            {isEditing ? (
              <div css={editContainerStyle}>
                <FormProvider {...methods}>
                  <form
                    css={formStyle}
                    onSubmit={methods.handleSubmit((data) =>
                      onSubmitContent(data, contentId)
                    )}
                  >
                    <TextInput
                      label="タイトル"
                      defaultValue={content.heading_title}
                      name="title"
                      required={true}
                      maxLength={25}
                    />
                    <Textarea
                      label="コンテンツ"
                      name="content"
                      defaultValue={content.content}
                      required={true}
                    />
                    {methods.formState.errors.title && (
                      <p css={errorMessageStyle}>
                        {methods.formState.errors.title.message}
                      </p>
                    )}
                    {methods.formState.errors.content && (
                      <p css={errorMessageStyle}>
                        {methods.formState.errors.content.message}
                      </p>
                    )}
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
                </FormProvider>
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
                  <EditImageButton
                    onClick={() => toggleEditContents(content._id)}
                  />
                </div>
                {splitAndNewLines(content.content)}
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
