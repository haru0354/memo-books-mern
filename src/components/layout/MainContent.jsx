import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { updateContentsAsync } from "../../store/slice/contentsSlice";
import { FormProvider, useForm } from "react-hook-form";
import { css } from "@emotion/react";
import { RightContent, formStyle } from "../../styles/styles";
import useToast from "../../hooks/useToast";
import SplitAndNewLines from "../../lib/SplitAndNewLines";
import Button from "../ui/Button";
import TextInput from "../ui/TextInput";
import Textarea from "../ui/Textarea";
import EditImageButton from "../ui/EditImageButton";
import AddContentModal from "../content/AddContentModal";
import DeleteContentModal from "../content/DeleteContentModal";
import AnimationItem from "../../lib/AnimationItem";

const tableOfContentsStyle = css`
  max-width: 380px;
  width: 90%;
  margin: 20px auto;
  border: 1px solid #cbc9c9;
  border-radius: 4px;

  p {
    text-align: center;
    border-bottom: 1px dotted #898989;
    padding-bottom: 4px;
  }

  ul {
    margin: 0 10px;
    padding: 0;
  }

  li {
    color: #1168ca;
    margin-right: 0px;
    margin-bottom: 5px;
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
  margin: 10px 5px;
  padding: 1rem;
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
  max-width: 100%;
`;

const cancelButtonStyle = css`
  margin: 0 10px;
`;

const editingButtonContainerStyle = css`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const MainContent = ({ bookId, chapterId }) => {
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
  const showToast = useToast();

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

    try {
      await dispatch(
        updateContentsAsync({ bookId, chapterId, contentId, formData })
      ).unwrap();

      methods.reset();
      toggleEditContents(contentId);
      showToast("メモの編集が完了しました");
    } catch (error) {
      showToast("メモの編集に失敗しました");
      console.error("メモの編集に失敗しました。", error);
    }
  };

  return (
    <AnimationItem
      elType="div"
      animation="slideMaskDown"
      emotionCss={RightContent}
      key={chapterId}
    >
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
                  toggleEditContents={toggleEditContents}
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
                <SplitAndNewLines text={content.content} />
              </>
            )}
          </div>
        );
      })}
      <AddContentModal bookId={bookId} chapterId={chapterId} />
    </AnimationItem>
  );
};

export default MainContent;
