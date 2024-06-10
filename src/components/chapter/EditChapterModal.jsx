import { useRef, useState } from "react";
import Button from "../ui/Button";
import TextInput from "../ui/TextInput";
import { css } from "@emotion/react";
import {
  errorMessageStyle,
  formStyle,
  modalBackStyle,
  modalContainerStyle,
} from "../../styles/styles";
import chapterApi from "../../api/chapter";
import { useDispatch, useSelector } from "react-redux";
import { updateChapter } from "../../store/slice/chaptersSlice";
import DeleteChapterModal from "./DeleteChapterModal";
import EditImageButton from "../ui/EditImageButton";
import { FormProvider, useForm } from "react-hook-form";

const buttonContainerStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: 20px;
`;

const EditChapterModal = ({ bookId, chapterId, chapterTitle }) => {
  const [isEditModal, setIsEditModal] = useState(false);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user.uid)
  const methods = useForm();
  const bodyRef = useRef(document.body);

  const disableScroll = () => {
    bodyRef.current.style.overflowY = 'hidden';
  };

  const enableScroll = () => {
    bodyRef.current.style.overflow = 'auto';
  };

  const onSubmit = async (data) => {
    const formData = {
      chapter_title: data.title,
    };

    try {
      const response = await chapterApi.patch(userId, bookId, chapterId, formData);

      dispatch(updateChapter(response));
      toggleCloseEditModal();
    } catch (error) {
      console.error("編集に失敗しました", error);
    }
  };

  const toggleOpenModal = () => {
    setIsEditModal((prev) => !prev);
    disableScroll();
  };

  const toggleCloseEditModal = () => {
    setIsEditModal((prev) => !prev);
    enableScroll();
  };

  const closeModal = (e) => {
    if (e.target === e.currentTarget) {
      setIsEditModal();
      enableScroll();
    }
  };

  return (
    <>
      <EditImageButton onClick={toggleOpenModal} />
      {isEditModal && (
        <div css={modalBackStyle} onClick={closeModal}>
          <div css={modalContainerStyle}>
            <h3>チャプターの編集</h3>
            <FormProvider {...methods}>
              <form css={formStyle} onSubmit={methods.handleSubmit(onSubmit)}>
                <TextInput
                  label="チャプター名"
                  placeholder="チャプター名を入力してください。"
                  name="title"
                  defaultValue={chapterTitle}
                  required={true}
                  maxLength={16}
                />
                {methods.formState.errors.title && (
                  <p css={errorMessageStyle}>{methods.formState.errors.title.message}</p>
                )}
                <div css={buttonContainerStyle}>
                  <Button type="submit" color="blue">
                    保存する
                  </Button>
                  <Button color="gray" onClick={toggleCloseEditModal}>
                    キャンセル
                  </Button>
                </div>
              </form>
            </FormProvider>
            <DeleteChapterModal
              chapterTitle={chapterTitle}
              chapterId={chapterId}
              bookId={bookId}
              toggleCloseEditModal={toggleCloseEditModal}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default EditChapterModal;
