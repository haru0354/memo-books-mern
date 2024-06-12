import { useRef, useState } from "react";
import Button from "../ui/Button";
import TextInput from "../ui/TextInput";
import AddButton from "../ui/AddButton";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import {
  errorMessageStyle,
  formStyle,
  modalBackStyle,
  modalContainerStyle,
} from "../../styles/styles";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addBookAsync } from "../../store/slice/booksSlice";
import { useToast } from "../../context/ToastContext";

const buttonContainerStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: 20px;
`;

const AddBookModal = () => {
  const [isAddModal, setIsAddModal] = useState(false);
  const navigate = useNavigate();
  const methods = useForm();
  const bodyRef = useRef(document.body);
  const userId = useSelector((state) => state.user.user.uid)
  const dispatch = useDispatch();
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
      chapters: [
        {
          chapter_title: "チャプター1",
          contents: [],
        },
      ],
    };

    try {
      const response = await dispatch(
        addBookAsync({ userId, formData })
      ).unwrap();
      toggleCloseModal();
      showToast("本が追加されました")
      navigate(`/${response._id}/${response.chapters[0]._id}`);
    } catch (error) {
      showToast("本の追加に失敗しました")
      console.error("本の追加に失敗しました。", error);
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
      <AddButton isBook={true} onClick={toggleOpenModal} />
      {isAddModal && (
        <div css={modalBackStyle} onClick={closeModal}>
          <div css={modalContainerStyle}>
            <h3>本のフォーム</h3>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)} css={formStyle}>
                <TextInput
                  label="本のタイトル"
                  placeholder="本のタイトルを入力してください。"
                  name="title"
                  required={true}
                  maxLength={18}
                />
                {methods.formState.errors.title && (
                  <p css={errorMessageStyle}>
                    {methods.formState.errors.title.message}
                  </p>
                )}
                <div css={buttonContainerStyle}>
                  <Button type="submit" color="blue">
                    追加する
                  </Button>
                  <Button type="button" color="gray" onClick={toggleCloseModal}>
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

export default AddBookModal;
