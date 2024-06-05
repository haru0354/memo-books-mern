import { useState } from "react";
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
import { useDispatch } from "react-redux";
import Textarea from "../ui/Textarea";
import contentApi from "../../api/content";
import { addContents } from "../../store/slice/contentsSlice";
import { FormProvider, useForm } from "react-hook-form";

const buttonContainerStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: 20px;
`;

const AddContentModal = ({ bookId, chapterId }) => {
  const [isAddModal, setIsAddModal] = useState(false);
  const dispatch = useDispatch();
  const methods = useForm();

  const onSubmit = async (data) => {
    const formData = {
      heading_title: data.title,
      content: data.content,
    };

    try {
      const response = await contentApi.post(bookId, chapterId, formData);

      if (response.content !== formData.content) {
        throw new Error("フォームの送信に失敗しました。");
      }

      dispatch(addContents(response));
      toggleAddModal();
      methods.reset();
    } catch (error) {
      console.error("フォームの送信に失敗しました。", error);
    }
  };

  const toggleAddModal = () => {
    setIsAddModal((prev) => !prev);
  };

  const closeModal = (e) => {
    if (e.target === e.currentTarget) {
      toggleAddModal();
    }
  };

  return (
    <>
      <AddButton onClick={toggleAddModal} />
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
                  <Button color="gray" onClick={toggleAddModal}>
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
