import { css } from "@emotion/react";
import { RightContent } from "../styles/styles";
import { formStyle } from "../styles/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addChapter } from "../store/slice/chaptersSlice";
import chapterApi from "../api/chapter";
import { useState } from "react";
import TextInput from "./ui/TextInput";
import Button from "./ui/Button";

const formContainerStyle = css`
  margin: 4rem 4rem;
`;

const textStyle = css`
  text-align: center;
`;

const AddChapterForm = ({ bookId }) => {
  const [title, setTitle] = useState("");
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
      setTitle("");
      navigate(`/${bookId}/${response._id}`);
    } catch (error) {
      console.error("フォームの送信に失敗しました。", error);
    }
  };

  return (
    <div css={RightContent}>
      <h1>チャプターの追加</h1>
      <p css={textStyle}>このページではチャプターを追加することができます。</p>
      <p css={textStyle}>下記のフォーム、またはサイドメニューの「+」ボタンよりチャプターを登録してください。</p>
      <div css={formContainerStyle}>
        <form onSubmit={handleSubmit} css={formStyle}>
          <TextInput
            label="チャプター名"
            placeholder="チャプター名を入力してください。"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button type="submit" color="blue">
            追加する
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddChapterForm;
