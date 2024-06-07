import { useState } from "react";
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

const buttonContainerStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: 20px;
`;


const DeleteBookModal = ({ guidance, title, bookId }) => {
    const [isDeleteModalOpen, setIdDeleteModalOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const toggleDeleteModal = () => {
      setIdDeleteModalOpen((prev) => !prev);
    };
  
    const closeModal = (e) => {
      if (e.target === e.currentTarget) {
        toggleDeleteModal();
      }
    };
  
    const onClickDelete = async () => {
      const response = await bookApi.delete(bookId);
      if (response.message === "本の削除に成功しました。") {
        dispatch(deleteBook(response.deletedBookId));
  
        toggleDeleteModal();
        navigate("/books");
      } else {
        console.error("本の削除に失敗しました。");
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
              <p>「{title}」を削除しますか？</p>
              <p>削除すると復元することはできません。</p>
              {guidance && (
                <span css={pStyle}>「本」の中見も全て削除されます。</span>
              )}
              <div css={buttonContainerStyle}>
                <Button color="red" onClick={onClickDelete}>
                  削除
                </Button>
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
  
export default DeleteBookModal