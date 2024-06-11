import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { addChaptersAsync } from "../../store/slice/chaptersSlice";
import { FormProvider, useForm } from "react-hook-form";

const buttonContainerStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: 20px;
`;

const AddChapterModal = ({ bookId, toggleCloseAddModal, toggleHumBergerMenu }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user.uid);
  const methods = useForm();

  const onSubmit = async (data) => {
    const formData = {
      chapter_title: data.title,
    };

    try {
      const response = await dispatch(
        addChaptersAsync({ userId, bookId, formData })
      ).unwrap();
      toggleCloseAddModal();
      toggleHumBergerMenu();
      methods.reset();
      navigate(`/${bookId}/${response._id}`);
    } catch (error) {
      console.error("フォームの送信に失敗しました。", error);
    }
  };

  return (
    <>
      <div css={modalContainerStyle}>
        <h3>チャプターの追加</h3>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} css={formStyle}>
            <TextInput
              label="チャプター名"
              placeholder="チャプター名を入力してください。"
              name="title"
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
                追加する
              </Button>
              <Button type="button" color="gray" onClick={toggleCloseAddModal}>
                キャンセル
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default AddChapterModal;
