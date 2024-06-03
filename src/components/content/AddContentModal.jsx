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
import { useDispatch } from "react-redux";
import Textarea from "../ui/Textarea";
import contentApi from "../../api/content";
import { addContents } from "../../store/slice/contentsSlice";

const buttonContainerStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: 20px;
`;

const AddContentModal = ({ bookId, chapterId }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isAddModal, setIsAddModal] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      heading_title: title,
      content: content
    };

    try {
      const response = await contentApi.post(bookId, chapterId, formData);

      if (response.content !== formData.content) {
        throw new Error("フォームの送信に失敗しました。");
      }

      dispatch(addContents(response));
      toggleAddModal();
      setTitle("");
      setContent("")
    } catch (error) {
      console.error("フォームの送信に失敗しまし00000た。", error);
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
            <p>コンテンツの追加</p>
            <form onSubmit={handleSubmit} css={formStyle}>
              <TextInput
                label="タイトル"
                placeholder="タイトルを入力してください。"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Textarea
                label="コンテンツ"
                placeholder="コンテンツを入力してください。"
                value={content}
                onChange={(e) => setContent(e.target.value)}
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

export default AddContentModal;
