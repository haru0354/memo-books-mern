import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteContentsAsync } from "../../store/slice/contentsSlice";
import { css } from "@emotion/react";
import { modalBackStyle, modalContainerStyle } from "../../styles/styles";
import useToast from "../../hooks/useToast";
import Button from "../ui/Button";

const buttonContainerStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: 20px;
`;

const deleteButtonStyle = css`
  margin: 1rem auto;
`;

const modalAddStyle = css`
  text-align: center;
`;

const DeleteContentModal = ({ contentTitle, bookId, chapterId, contentId, toggleEditContents }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const dispatch = useDispatch();
  const showToast = useToast();
  const bodyRef = useRef(document.body);

  const disableScroll = () => {
    bodyRef.current.style.overflowY = "hidden";
  };

  const enableScroll = () => {
    bodyRef.current.style.overflow = "auto";
  };

  const toggleOpenModal = () => {
    setIsDeleteModalOpen((prev) => !prev);
    disableScroll();
  };

  const toggleCloseModal = () => {
    setIsDeleteModalOpen((prev) => !prev);
    enableScroll();
  };

  const closeModal = (e) => {
    if (e.target === e.currentTarget) {
      toggleCloseModal();
    }
  };

  const onClickDelete = async () => {
    try {
      await dispatch(deleteContentsAsync({bookId, chapterId, contentId})).unwrap();
      toggleCloseModal();
      toggleEditContents(contentId);
      showToast("メモが削除されました")
    } catch (error) {
      showToast("メモの削除に失敗しました")
      console.error("メモの削除に失敗しました。");
    }
  };

  return (
    <>
      <Button
        color="red"
        addCss={deleteButtonStyle}
        onClick={toggleOpenModal}
        type="button"
      >
        削除
      </Button>
      {isDeleteModalOpen && (
        <div css={modalBackStyle} onClick={closeModal}>
          <div css={[modalContainerStyle, modalAddStyle]}>
            <p>「{contentTitle}」を削除しますか？</p>
            <p>削除すると復元することはできません。</p>
            <div css={buttonContainerStyle}>
              <Button color="red" onClick={onClickDelete}>
                削除
              </Button>
              <Button type="button" color="gray" onClick={toggleCloseModal}>
                キャンセル
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteContentModal;
