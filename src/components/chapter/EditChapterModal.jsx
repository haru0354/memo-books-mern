import { useState } from "react";
import Button from "../ui/Button";
import TextInput from "../ui/TextInput";
import AddButton from "../ui/AddButton";
import { css } from "@emotion/react";
import {
  formStyle,
  modalBackStyle,
  modalContainerStyle,
} from "../../styles/styles";
import chapterApi from "../../api/chapter";
import { useDispatch } from "react-redux";
import { updateChapter } from "../../store/slice/chaptersSlice";
import DeleteChapterModal from "./DeleteChapterModal";
import EditImageButton from "../ui/EditImageButton";

const buttonContainerStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: 20px;
`;

const editButtonStyle = css`
  display: block;
  margin: 2rem auto;
`;

const EditChapterModal = ({ bookId, chapterId, chapterTitle }) => {
  const [title, setTitle] = useState(`${chapterTitle}`);
  const [isAddModal, setIsAddModal] = useState(false);
  const dispatch = useDispatch();

  const formSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      chapter_title: title,
    };

    try {
      const response = await chapterApi.patch(bookId, chapterId, formData);

      dispatch(updateChapter(response));
      toggleAddModal();
    } catch (error) {
      console.error("編集に失敗しました", error);
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
    <EditImageButton onClick={toggleAddModal}/>
      {isAddModal && (
        <div css={modalBackStyle} onClick={closeModal}>
          <div css={modalContainerStyle}>
            <h3>チャプターの編集</h3>
            <form  css={formStyle}>
              <TextInput
                label="チャプター名"
                placeholder="チャプター名を入力してください。"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div css={buttonContainerStyle}>
                <Button type="submit" color="blue" onClick={formSubmit}>
                  保存する
                </Button>
                <Button color="gray" onClick={toggleAddModal}>
                  キャンセル
                </Button>
              </div>
            </form>
            <DeleteChapterModal
              chapterTitle={chapterTitle}
              chapterId={chapterId}
              bookId={bookId}
              toggleAddModal={toggleAddModal}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default EditChapterModal;
