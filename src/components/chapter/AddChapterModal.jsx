import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { addChapter } from "../../store/slice/chaptersSlice";

const buttonContainerStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: 20px;
`;

const AddChapterModal = ({ bookId }) => {
  const [title, setTitle] = useState("");
  const [isAddModal, setIsAddModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      chapter_title: title,
    };

    try {
      const response = await chapterApi.post(bookId, formData);

      if (!response || !response._id) {
        throw new Error("フォームの送信に失敗しました。");
      }

      dispatch(addChapter(response));
      toggleAddModal();
      setTitle("");
      navigate(`/${bookId}/${response._id}`);
    } catch (error) {
      console.error("フォームの送信に失敗しました。", error);
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
      <AddButton onClick={toggleAddModal} />
      {isAddModal && (
        <div css={modalBackStyle} onClick={closeModal}>
          <div css={modalContainerStyle}>
            <h3>チャプターの追加</h3>
            <form onSubmit={handleSubmit} css={formStyle}>
              <TextInput
                label="チャプター名"
                placeholder="チャプター名を入力してください。"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div css={buttonContainerStyle}>
                <Button type="submit" color="blue">
                  追加する
                </Button>
                <Button color="gray" onClick={toggleAddModal}>
                  キャンセル
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddChapterModal;
