import { useState } from "react";
import Button from "../ui/Button";
import TextInput from "../ui/TextInput"
import AddButton from "../ui/AddButton";
import { css } from "@emotion/react";
import bookApi from "../../api/book";
import { useNavigate } from "react-router-dom";
import { formStyle, modalBackStyle, modalContainerStyle } from "../../styles/styles";

const buttonContainerStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: 20px;
`;

const AddBookModal = () => {
  const [title, setTitle] = useState("");
  const [isAddModal, setIsAddModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      title: title,
      chapters: [
        {
          chapter_title: "チャプター1",
          contents: [],
        },
      ],
    };

    try {
      const response = await bookApi.post(formData);

      if (!response || !response._id) {
        throw new Error("フォームの送信に失敗しました。");
      }

      navigate(`/${response._id}/${response.chapters[0]._id}`);
    } catch (error) {
      console.error("フォームの送信に失敗しました。111", error);
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
      <AddButton isBook={true} onClick={toggleAddModal} />
      {isAddModal && (
        <div css={modalBackStyle} onClick={closeModal}>
          <div css={modalContainerStyle}>
            <p>本のフォーム</p>
            <form onSubmit={handleSubmit} css={formStyle}>
              <TextInput
                label="本のタイトル"
                placeholder="本のタイトルを入力してください。"
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

export default AddBookModal;
