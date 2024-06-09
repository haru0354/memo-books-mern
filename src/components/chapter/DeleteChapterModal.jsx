import { useState } from "react";
import Button from "../ui/Button";
import { css } from "@emotion/react";
import { modalBackStyle, modalContainerStyle } from "../../styles/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import chapterApi from "../../api/chapter";
import { deleteChapter } from "../../store/slice/chaptersSlice";

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

const modalAddStyle = css`
  text-align: center;
`;

const deleteButtonStyle = css`
  display: block;
  margin: 1rem auto;
`;

const DeleteChapterModal = ({
  toggleAddModal,
  chapterTitle,
  bookId,
  chapterId,
}) => {
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
    try {
      const response = await chapterApi.delete(bookId, chapterId);
      if (response.deletedChapterId === chapterId) {
        dispatch(deleteChapter(response.deletedChapterId));
  
        toggleDeleteModal();
        toggleAddModal();
        if (response.redirectedUrl) {
          navigate(`/${bookId}/${response.redirectedUrl}`);
        } else {
          navigate(`/${bookId}`);
        }
      } else {
        console.error("チャプターの削除に失敗しました。");
      }
    } catch (error) {
      console.error("チャプターの削除に失敗しました。");
    }
  };
  return (
    <>
      <Button
        addCss={deleteButtonStyle}
        color="red"
        onClick={toggleDeleteModal}
      >
        削除
      </Button>
      {isDeleteModalOpen && (
        <div css={modalBackStyle} onClick={closeModal}>
          <div css={[modalContainerStyle, modalAddStyle]}>
            <p>「{chapterTitle}」を削除しますか？</p>
            <p>削除すると復元することはできません。</p>
            <span css={pStyle}>「チャプター」の中見も全て削除されます。</span>
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

export default DeleteChapterModal;
