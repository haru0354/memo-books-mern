import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import Button from "../components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../store/slice/booksSlice";
import AddBookModal from "../components/book/AddBookModal";
import { main1ColumnStyle } from "../styles/styles";
import EditBookModal from "../components/book/EditBookModal";

const bookContainerStyle = css`
  padding: 0 1.8rem;
`;

const bookTitleStyle = css`
  padding-right: 15px;
  text-align: center;
`;

const BooksAreaStyle = css`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 1rem 4rem;
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

const addBookContainerStyle = css`
  text-align: center;
`;

const loadingStyle = css`
  text-align: center;
`;

const Books = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);
  const status = useSelector((state) => state.books.status);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchBooks());
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
    <main css={main1ColumnStyle}>
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
                  <h2>{book.title}</h2>
                </div>
              </div>
            </Link>
            <div css={editButtonContainerStyle}>
              <EditBookModal bookTitle={book.title} bookId={book._id} />
            </div>
          </div>
        ))}
      </div>
      <div css={addBookContainerStyle}>
        <AddBookModal />
      </div>
    </main>
  );
};

export default Books;
