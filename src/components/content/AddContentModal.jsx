import { useRef, useState } from "react";
import Button from "../ui/Button";
import TextInput from "../ui/TextInput";
import AddButton from "../ui/AddButton";
import { css } from "@emotion/react";
import {
  errorMessageStyle,
  formStyle,
  modalBackStyle,
  modalContainerStyle,
} from "../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import Textarea from "../ui/Textarea";
import { addContentsAsync } from "../../store/slice/contentsSlice";
import { FormProvider, useForm } from "react-hook-form";
import { useToast } from "../../context/ToastContext";

const buttonContainerStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: 20px;
`;

const AddContentModal = ({ bookId, chapterId }) => {
  const [isAddModal, setIsAddModal] = useState(false);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user.uid)
  const methods = useForm();
  const showToast = useToast();
  const bodyRef = useRef(document.body);

  const disableScroll = () => {
    bodyRef.current.style.overflowY = 'hidden';
  };

  const enableScroll = () => {
    bodyRef.current.style.overflow = 'auto';
  };

  const onSubmit = async (data) => {
    const formData = {
      heading_title: data.title,
      content: data.content,
    };

    try {
      await dispatch(addContentsAsync({userId, bookId, chapterId, formData})).unwrap();
      toggleCloseModal();
      showToast("メモが追加されました")
      methods.reset();
    } catch (error) {
      showToast("メモの追加に失敗しました")
      console.error("メモの追加に失敗しました。", error);
    }
  };

  const toggleOpenModal = () => {
    setIsAddModal((prev) => !prev);
    disableScroll();
  };

  const toggleCloseModal = () => {
    setIsAddModal((prev) => !prev);
    enableScroll();
  };

  const closeModal = (e) => {
    if (e.target === e.currentTarget) {
      toggleCloseModal();
    }
  };


  return (
    <>
      <AddButton onClick={toggleOpenModal} />
      {isAddModal && (
        <div css={modalBackStyle} onClick={closeModal}>
          <div css={modalContainerStyle}>
            <h3>コンテンツの追加</h3>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)} css={formStyle}>
                <TextInput
                  label="タイトル"
                  placeholder="タイトルを入力してください。"
                  name="title"
                  required={true}
                  maxLength={25}
                />
                <Textarea
                  label="コンテンツ"
                  placeholder="コンテンツを入力してください。"
                  name="content"
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
                <div css={buttonContainerStyle}>
                  <Button type="submit" color="blue">
                    追加する
                  </Button>
                  <Button color="gray" onClick={toggleCloseModal}>
                    キャンセル
                  </Button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      )}
    </>
  );
};

export default AddContentModal;
