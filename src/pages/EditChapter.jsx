import { useEffect, useState } from "react";
import chapterApi from "../api/chapter";
import { Link, useParams } from "react-router-dom";
import ChapterList from "../components/ChapterList";
import { RightContent, formStyle, main2ColumnStyle } from "../styles/styles";
import { css } from "@emotion/react";
import Button from "../components/ui/Button";
import TextInput from "../components/ui/TextInput";

const divStyle = css`
  margin: 0 auto;
  padding: 4rem;
  width: 450px;
  border-radius: 4px;
  background-color: white;

  p {
    font-weight: 600;
    text-align: center;
    padding-bottom: 8px;
    margin-bottom: 40px;
    border-bottom: 1px solid rgb(185 184 184);
  }
`;

const buttonContainerStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: 20px;
`;

const EditChapter = () => {
  const [chapter, setChapter] = useState();
  const { chapterId } = useParams();
  const { bookId } = useParams();

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const data = await chapterApi.get(bookId, chapterId);
        setChapter(data);
      } catch (error) {
        console.error("DBから本の取得に失敗しました。");
      }
    };
    fetchChapter();
  }, [chapterId, bookId]);

  if (!chapter) {
    return <p>Loading...</p>;
  }

  return (
    <div css={main2ColumnStyle}>
      <ChapterList chapters={chapter.bookChapters} bookId={bookId} />
      <div css={RightContent}>
        <h1>{chapter.chapter.chapter_title}</h1>
        <div css={divStyle}>
          <form action="" css={formStyle}>
            <p>チャプターの編集フォーム</p>
            <TextInput
              label="タイトル"
              placeholder="タイトルを入力してください。"
            />
            <div css={buttonContainerStyle}>
              <Button color="blue">保存する</Button>
              <Link to="/books">
                <Button color="gray">キャンセル</Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default EditChapter;
