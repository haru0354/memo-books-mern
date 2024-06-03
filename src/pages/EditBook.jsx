import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import TextInput from "../components/ui/TextInput";
import Button from "../components/ui/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookById, updateBook } from "../store/slice/booksSlice";
import bookApi from "../api/book";

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
  const { bookId } = useParams();
  const dispatch = useDispatch();
  const book = useSelector((state) => state.books.books.find((book) => book._id === bookId));
  const status = useSelector((state) => state.chapters.status);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (book) {
      setTitle(book.title || "");
    }
  }, [book]);

  useEffect(() => {
    dispatch(fetchBookById(bookId));
  }, [dispatch, bookId]);

  if (!book) {
    return <p>本が見つかりませんでした。</p>;
  }

  if (status === "loading") {
    return <p>Loading ...</p>;
  }

  const formSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      title,
    };

    try {
      const response = await bookApi.patch(bookId, formData);

      if (response._id !== bookId) {
        throw new Error("編集に失敗しました。");
      }

      dispatch(updateBook(response));
      navigate("/books");
    } catch (error) {
      console.error("編集に失敗しました", error);
    }
  };

  return (
    <main css={mainStyle}>
      <h1>本の編集</h1>
      <div css={divStyle}>
        <form onSubmit={formSubmit} css={formStyle}>
          <p>本の編集フォーム</p>
          <TextInput
            label="タイトル"
            placeholder="タイトルを入力してください。"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div css={buttonContainerStyle}>
            <Button color="blue">保存する</Button>
            <Link to="/books">
              <Button color="gray">キャンセル</Button>
            </Link>
          </div>
        </form>
      </div>
      <div css={aStyle}></div>
    </main>
  );
};

export default EditBook;
