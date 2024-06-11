import { useRef, useState } from "react";
import Button from "../ui/Button";
import { css } from "@emotion/react";
import { modalBackStyle, modalContainerStyle } from "../../styles/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteBook } from "../../store/slice/booksSlice";
import bookApi from "../../api/book";

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

const DeleteBookModal = ({ bookTitle, bookId }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bodyRef = useRef(document.body);

  const disableScroll = () => {
    bodyRef.current.style.overflowY = "hidden";
  };

  const enableScroll = () => {
    bodyRef.current.style.overflow = 'auto';
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
    const response = await bookApi.delete(bookId);
    if (response.message === "本の削除に成功しました。") {
      dispatch(deleteBook(response.deletedBookId));

      toggleCloseModal();
      navigate("/books");
    } else {
      console.error("本の削除に失敗しました。");
    }
  };

  return (
    <>
      <Button
        addCss={DeleteButtonStyle}
        color="red"
        onClick={toggleOpenModal}
      >
        削除
      </Button>
      {isDeleteModalOpen && (
        <div css={modalBackStyle} onClick={closeModal}>
          <div css={[modalContainerStyle, modalAddStyle]}>
            <p>「{bookTitle}」を削除しますか？</p>
            <p>削除すると復元することはできません。</p>

            <span css={pStyle}>「本」の中見も全て削除されます。</span>

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
