import { useEffect, useRef, useState } from "react";
import Button from "../ui/Button";
import { css } from "@emotion/react";
import { modalBackStyle, modalContainerStyle } from "../../styles/styles";
import useToast from "../../hooks/useToast";

const infoTitleStyle = css`
  font-weight: 600;
  color: red;
`;

const buttonContainerStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: 20px;
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

  const bodyRef = useRef(document.body);
  const showToast = useToast();

  useEffect(() => {
    if (isDeleteModalOpen) {
      bodyRef.current.style.overflowY = "hidden";
    } else {
      bodyRef.current.style.overflow = "auto";
    }

    return () => {
      bodyRef.current.style.overflow = "auto";
    };
  }, [isDeleteModalOpen]);

  const toggleModal = () => setIsDeleteModalOpen((prev) => !prev);

  const closeModal = (e) => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

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
      {isDeleteModalOpen && (
        <div css={[modalBackStyle]} onClick={closeModal}>
          <div css={[modalContainerStyle, modalAddStyle]}>
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
        </div>
      )}
    </>
  );
};

export default DeleteModal;
