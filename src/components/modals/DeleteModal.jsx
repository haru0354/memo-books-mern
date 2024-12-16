import { useState } from "react";
import { css } from "@emotion/react";
import { buttonContainerStyle } from "../../styles/styles";
import useToast from "../../hooks/useToast";
import Button from "../ui/Button";
import Modal from "./Modal";

const infoTitleStyle = css`
  font-weight: 600;
  color: red;
`;

const modalAddStyle = css`
  text-align: center;
`;

const deleteButtonStyle = css`
  display: block;
  margin: 1rem auto;
`;

const DeleteModal = ({ onDelete, deleteTitle, infoTitle }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const showToast = useToast();

  const toggleModal = () => setIsDeleteModalOpen((prev) => !prev);

  const onClickDelete = async () => {
    try {
      await onDelete();
      showToast(`${deleteTitle}を削除しました`);
      toggleModal();
    } catch (error) {
      showToast(`${deleteTitle}の削除に失敗しました`);
      console.error(`${deleteTitle}の削除に失敗しました`, error);
    }
  };

  return (
    <>
      <Button addCss={deleteButtonStyle} color="red" onClick={toggleModal}>
        削除
      </Button>
      <Modal isOpen={isDeleteModalOpen} onClose={toggleModal}>
        <div css={modalAddStyle}>
          <p>「{deleteTitle}」を削除しますか？</p>
          <p>削除すると復元することはできません。</p>
          {infoTitle && (
            <span css={infoTitleStyle}>
              「{infoTitle}」の中見も全て削除されます。
            </span>
          )}
          <div css={buttonContainerStyle}>
            <Button color="red" onClick={onClickDelete}>
              削除
            </Button>
            <Button color="gray" onClick={toggleModal}>
              キャンセル
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteModal;
