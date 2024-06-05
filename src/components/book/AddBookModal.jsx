import { useState } from "react";
import Button from "../ui/Button";
import TextInput from "../ui/TextInput";
import AddButton from "../ui/AddButton";
import { css } from "@emotion/react";
import bookApi from "../../api/book";
import { useNavigate } from "react-router-dom";
import {
  formStyle,
  modalBackStyle,
  modalContainerStyle,
} from "../../styles/styles";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

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
      const response = await bookApi.post(formData);

      if (!response || !response._id) {
        throw new Error("フォームの送信に失敗しました。");
      }

      navigate(`/${response._id}/${response.chapters[0]._id}`);
    } catch (error) {
      console.error("フォームの送信に失敗しました。111", error);
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
      <AddButton isBook={true} onClick={toggleAddModal} />
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
                  <Button type="button" color="gray" onClick={toggleAddModal}>
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
