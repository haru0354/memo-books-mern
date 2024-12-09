import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBookAsync } from "../../store/slice/booksSlice";
import { FormProvider, useForm } from "react-hook-form";
import { css } from "@emotion/react";
import {
  formStyle,
  modalBackStyle,
  modalContainerStyle,
  errorMessageStyle,
} from "../../styles/styles";
import useToast from "../../hooks/useToast";
import DeleteBookModal from "./DeleteBookModal";
import TextInput from "../ui/TextInput";
import Button from "../../components/ui/Button";

const buttonContainerStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: 20px;
`;

const addFormStyle = css`
  padding-bottom: 20px;
`;

const EditBookModal = ({ bookId, bookTitle }) => {
  const [isEditModal, setIsEditModal] = useState(false);
  const dispatch = useDispatch();
  const methods = useForm();
  const userId = useSelector((state) => state.user.user.uid);
  const bodyRef = useRef(document.body);
  const showToast = useToast();

  const disableScroll = () => {
    bodyRef.current.style.overflowY = "hidden";
  };

  const enableScroll = () => {
    bodyRef.current.style.overflow = "auto";
  };

  const onSubmit = async (data) => {
    const formData = {
      title: data.title,
    };

    try {
      await dispatch(updateBookAsync({ userId, bookId, formData })).unwrap();
      toggleCloseEditModal();
      showToast("編集が完了しました")
    } catch (error) {
      showToast("編集に失敗しました。")
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
      toggleCloseEditModal();
    }
  };

  return (
    <>
      <Button color="blue" onClick={toggleOpenModal}>
        編集
      </Button>
      {isEditModal && (
        <div css={modalBackStyle} onClick={closeModal}>
          <div css={[modalContainerStyle, addFormStyle]}>
            <h3>本の編集</h3>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)} css={formStyle}>
                <TextInput
                  label="タイトル"
                  placeholder="タイトルを入力してください。"
                  name="title"
                  required={true}
                  maxLength={18}
                  defaultValue={bookTitle}
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
                  <Button color="gray" onClick={toggleCloseEditModal}>
                    キャンセル
                  </Button>
                </div>
              </form>
            </FormProvider>
            <DeleteBookModal
              bookTitle={bookTitle}
              bookId={bookId}
              toggleCloseEditModal={toggleCloseEditModal}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default EditBookModal;
