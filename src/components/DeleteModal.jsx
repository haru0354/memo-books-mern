import { useState } from "react";
import Button from "./ui/Button";
import { css } from "@emotion/react";
import { modalBackStyle, modalContainerStyle } from "../styles/styles";

const pStyle = css`
  font-weight: 600;
  color: red;
`;
const buttonContainerStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: 20px;
`;

const DeleteModal = ({ guidance, title }) => {
  const [isDeleteModalOpen, setIdDeleteModalOpen] = useState(false);
  const toggleDeleteModal = () => {
    setIdDeleteModalOpen((prev) => !prev);
  };

  const closeModal = (e) => {
    if (e.target === e.currenTarget) {
      toggleDeleteModal();
    }
  };

  return (
    <>
      <Button color="red" onClick={toggleDeleteModal}>
        削除
      </Button>
      {isDeleteModalOpen && (
        <div css={modalBackStyle} onClick={closeModal}>
          <div css={modalContainerStyle}>
            「{title}」を削除しますか？
            <p>削除すると復元することはできません。</p>
            {guidance && (
              <p css={pStyle}>「{guidance}」の中見も全て削除されます。</p>
            )}
            <div css={buttonContainerStyle}>
              <Button color="red">削除</Button>
              <Button color="gray" onClick={toggleDeleteModal}>
                キャンセル
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteModal;
