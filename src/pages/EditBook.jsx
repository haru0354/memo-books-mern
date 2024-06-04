import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import bookApi from "../api/book";
import TextInput from "../components/ui/TextInput";
import Button from "../components/ui/Button";
import { Link, useParams } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";

const mainStyle = css`
  max-width: 1080px;
  margin: 0 auto;

  h1 {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 2rem;
  }
`;

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

const formStyle = css`
  display: flex;
  height: auto;
  flex-direction: column;
  background-color: white;
  border: 1px solid gray;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-bottom: 2rem;
`;

const buttonContainerStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: 20px;
`;

const aStyle = css`
  text-align: center;
`;

const EditBook = () => {
  const [book, setBook] = useState();
  const { bookId } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await bookApi.get(bookId);
        setBook(data);
      } catch (error) {
        console.error("DBから本の取得に失敗しました。");
      }
    };

    fetchBook();
  }, [bookId]);

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <main css={mainStyle}>
      <h1>本の編集</h1>
      <div css={divStyle}>
        <form css={formStyle}>
          <p>本の編集フォーム</p>
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
      <div css={aStyle}>
        <DeleteModal guidance="本" title={book.title} />
      </div>
    </main>
  );
};

export default EditBook;
