import { useState } from "react";
import Button from "./ui/Button";
import TextInput from "./ui/TextInput";
import Textarea from "./ui/Textarea";
import AddButton from "./ui/AddButton";
import { css } from "@emotion/react";

const modalStyle = css`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(156 163 175 / 65%);
`;

const divStyle = css`
  width: 450px;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-bottom: 2rem;
  border-radius: 4px;
  background-color: white;

  p {
    font-weight: 600;
    text-align: center;
    padding-bottom: 8px;
    margin-bottom: 40px;
    border-bottom: 1px solid rgb(185 184 184);
  }
`;

const formStyle = css`
  display: flex;
  height: auto;
  flex-direction: column;
  background-color: white;
`;

const buttonContainerStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: 20px;
`;

const AddModal = ({ isContents = false, formTitle }) => {
  const [isAddModal, setIsAddModal] = useState(false);

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
        <div css={modalStyle} onClick={closeModal}>
          <div css={divStyle}>
            <p>{formTitle}のフォーム</p>
            <form css={formStyle}>
              <TextInput
                label="タイトル"
                placeholder="タイトルを入力してください。"
              />
              {isContents && (
                <Textarea
                  label="コンテンツ"
                  placeholder="コンテンツを入力してください。"
                />
              )}
              <div css={buttonContainerStyle}>
                <Button>追加する</Button>
                <Button onClick={toggleAddModal}>キャンセル</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddModal;
