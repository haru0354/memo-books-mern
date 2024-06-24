import { useRef, useState } from "react";
import Button from "../ui/Button";
import { css } from "@emotion/react";
import { modalBackStyle, modalContainerStyle } from "../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { deleteBookAsync } from "../../store/slice/booksSlice";
import useToast from "../../hooks/useToast";

const pStyle = css`
  font-weight: 600;
  color: red;
`;

const DeleteButtonStyle = css`
  display: block;
  margin: 0 auto;
`;

const modalAddStyle = css`
  text-align: center;
`;

const buttonContainerStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: 20px;
`;

const DeleteBookModal = ({ bookTitle, bookId, toggleCloseEditModal }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user.uid);
  const bodyRef = useRef(document.body);
  const showToast = useToast();

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
      await dispatch(deleteBookAsync({ userId, bookId })).unwrap();

      toggleCloseEditModal();
      toggleCloseModal();
      showToast("メモブックが削除されました")
    } catch (error) {
      showToast("メモブックの削除に失敗しました。")
      console.error("メモブックの削除に失敗しました。", error);
    }
  };

  return (
    <>
      <Button addCss={DeleteButtonStyle} color="red" onClick={toggleOpenModal}>
        削除
      </Button>
      {isDeleteModalOpen && (
        <div css={modalBackStyle} onClick={closeModal}>
          <div css={[modalContainerStyle, modalAddStyle]}>
            <p>「{bookTitle}」を削除しますか？</p>
            <p>削除すると復元することはできません。</p>

            <span css={pStyle}>「メモブック」の中見も全て削除されます。</span>

            <div css={buttonContainerStyle}>
              <Button color="red" onClick={onClickDelete}>
                削除
              </Button>
              <Button color="gray" onClick={toggleCloseModal}>
                キャンセル
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteBookModal;
