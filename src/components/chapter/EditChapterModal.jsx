import { useDispatch, useSelector } from "react-redux";
import { updateChaptersAsync } from "../../store/slice/chaptersSlice";
import { FormProvider, useForm } from "react-hook-form";
import { css } from "@emotion/react";
import {
  errorMessageStyle,
  formStyle,
  modalContainerStyle,
} from "../../styles/styles";
import DeleteChapterModal from "./DeleteChapterModal";
import useToast from "../../hooks/useToast";
import Button from "../ui/Button";
import TextInput from "../ui/TextInput";

const buttonContainerStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: 20px;
`;

const EditChapterModal = ({
  bookId,
  chapterId,
  chapterTitle,
  toggleCloseEditModal,
}) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user.uid);
  const methods = useForm();
  const showToast = useToast();

  const onSubmit = async (data) => {
    const formData = {
      chapter_title: data.title,
    };

    try {
      await dispatch(
        updateChaptersAsync({ userId, bookId, chapterId, formData })
      ).unwrap();
      toggleCloseEditModal();
      showToast("チャプターを編集しました")
    } catch (error) {
      showToast("チャプターの編集に失敗しました")
      console.error("チャプターの編集に失敗しました", error);
    }
  };

  return (
    <>
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
              <p css={errorMessageStyle}>
                {methods.formState.errors.title.message}
              </p>
            )}
            <div css={buttonContainerStyle}>
              <Button type="submit" color="blue">
                保存する
              </Button>
              <Button type="button" color="gray" onClick={toggleCloseEditModal}>
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
    </>
  );
};

export default EditChapterModal;
