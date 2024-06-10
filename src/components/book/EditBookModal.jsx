import TextInput from "../ui/TextInput";
import { css } from "@emotion/react";
import {
  formStyle,
  modalBackStyle,
  modalContainerStyle,
  errorMessageStyle,
} from "../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import DeleteBookModal from "./DeleteBookModal";
import Button from "../../components/ui/Button";
import bookApi from "../../api/book";
import { updateBook } from "../../store/slice/booksSlice";
import { FormProvider, useForm } from "react-hook-form";
import { useRef, useState } from "react";

const buttonContainerStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: 20px;
`;


const EditBookModal = ({ bookId, bookTitle }) => {
  const [isEditModal, setIsEditModal] = useState(false);
  const dispatch = useDispatch();
  const methods = useForm();
  const userId = useSelector((state) => state.user.user.uid)
  const bodyRef = useRef(document.body);
  
  const disableScroll = () => {
    bodyRef.current.style.overflowY = "hidden";
  };

  const enableScroll = () => {
    bodyRef.current.style.overflow = 'auto';
  };

  const onSubmit = async (data) => {

    const formData = {
      title: data.title
    };

    try {
      const response = await bookApi.patch(userId, bookId, formData);

      if (response._id !== bookId) {
        throw new Error("編集に失敗しました。");
      }

      dispatch(updateBook(response));
      toggleCloseModal();
    } catch (error) {
      console.error("編集に失敗しました", error);
    }
  };

  const toggleOpenModal = () => {
    setIsEditModal((prev) => !prev);
    disableScroll();
  };

  const toggleCloseModal = () => {
    setIsEditModal((prev) => !prev);
    enableScroll();
  };

  const closeModal = (e) => {
    if (e.target === e.currentTarget) {
      toggleCloseModal();
    }
  };

  return (
    <>
      <Button color="blue" onClick={toggleOpenModal}>
        編集
      </Button>
      {isEditModal && (
        <div css={modalBackStyle} onClick={closeModal}>
          <div css={modalContainerStyle}>
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
                  <Button color="gray" onClick={toggleCloseModal}>
                    キャンセル
                  </Button>
                </div>
              </form>
            </FormProvider>

            <DeleteBookModal bookTitle={bookTitle} bookId={bookId} />
          </div>
        </div>
      )}
    </>
  );
};

export default EditBookModal;
