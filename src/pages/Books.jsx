import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../store/slice/booksSlice";
import { css } from "@emotion/react";
import { main1ColumnStyle, oneColumnContainerStyle } from "../styles/styles";
import AddBookModal from "../components/book/AddBookModal";
import EditBookModal from "../components/book/EditBookModal";
import Page404 from "./Page404";

const bookContainerStyle = css`
  padding: 0 1.8rem;
`;

const addBookContainerStyle = css`
  background-color: white;
  padding-bottom: 52px;
  padding-left: 25px;
  padding-right: 25px;
  border-radius: 4px;
`;

const bookTitleStyle = css`
  padding-right: 15px;
  text-align: center;
`;

const BooksAreaStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 auto;
`;

const bookStyle = css`
  width: 180px;
  height: 240px;
  margin-bottom: 1rem;
  border: none;
  color: rgb(55 65 81);
  background: #f8f9fa;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 0 18px 23px rgba(0, 0, 0, 0.2);
  border-bottom-left-radius: 10px;

  &:hover {
    transform: translateY(-10px);
  }

  &:before {
    content: "";
    position: absolute;
    right: 10px;
    left: 0;
    width: 9%;
    height: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0.2), transparent);
    transition: all 0.3s ease;
  }

  &:after {
    content: "";
    position: absolute;
    top: auto;
    left: 0;
    bottom: 8px;
    width: 100%;
    height: 20px;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.1));
    transition: all 0.3s ease;
  }
`;

const editButtonContainerStyle = css`
  display: flex;
  flex-direction: column;
`;

const loadingStyle = css`
  text-align: center;
`;

const h2Style = css`
  word-wrap: break-word;
  padding-top: 2rem;
  padding-left: 1.7rem;
  font-size: 1.2rem;
`;

const Books = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);
  const status = useSelector((state) => state.books.status);
  const userId = useSelector((state) => state.user.user.uid);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchBooks(userId)).unwrap();
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading || status === "loading") {
    return <p css={loadingStyle}>Loading ...</p>;
  }

  return (
    <>
      <Helmet>
        <title>メモブックの一覧 | メモブックノート</title>
        <meta
          name="description"
          content="登録をしたメモブックの一覧ページです。今までに登録をした本の一覧が表示されます。各本の中にはチャプターやメモの登録か閲覧をすることができます。"
        />
        <meta name="robots" content="noindex" />
      </Helmet>
      <div css={main1ColumnStyle}>
        <div css={oneColumnContainerStyle}>
          <h1>メモブックの一覧</h1>
          <div css={BooksAreaStyle}>
            {books.map((book) => (
              <div css={bookContainerStyle} key={book._id}>
                <Link
                  to={
                    book.firstChapterId
                      ? `/${book._id}/${book.firstChapterId}`
                      : `/${book._id}`
                  }
                >
                  <div css={bookStyle}>
                    <div css={bookTitleStyle}>
                      <h2 css={h2Style}>{book.title}</h2>
                    </div>
                  </div>
                </Link>
                <div css={editButtonContainerStyle}>
                  <EditBookModal bookTitle={book.title} bookId={book._id} />
                </div>
              </div>
            ))}
            <div css={addBookContainerStyle}>
              <AddBookModal />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Books;
