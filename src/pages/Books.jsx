import { useEffect } from "react";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import Button from "../components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../store/slice/booksSlice";
import AddBookModal from "../components/book/AddBookModal";

const mainStyle = css`
  width: 1080px;
  margin: 0 auto;

  h1 {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 2rem;
  }

  h2 {
    padding-top: 2rem;
    padding-left: 2rem;
    font-size: 1.2rem;
  }
`;

const divStyle = css`
  display: flex;
  padding: 4rem;
`;

const bookStyle = css`
  width: 180px;
  height: 240px;
  border: none;
  background: #f8f9fa;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 0 18px 23px rgba(0, 0, 0, 0.2);
  border-end-end-radius: 10px;
  margin-right: 4rem;

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

const Books = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);
  const status = useSelector((state) => state.books.status);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  if (!books) {
    return <p>Loading...</p>;
  }
  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>Failed to fetch books.</p>;
  }

  return (
    <div css={mainStyle}>
      <h1>メモブックの一覧</h1>
      <div css={divStyle}>
        {books.map((book) => (
          <div key={book._id}>
            <Link
              to={`/${book._id}/${book.firstChapterId}`}
            >
              <div css={bookStyle}>
                <h2>{book.title}</h2>
              </div>
            </Link>
            <div css={editButtonContainerStyle}>
              <Link to={`/edit/${book._id}`}>
                <Button color="blue">編集</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div css={addBookContainerStyle}>
        <AddBookModal />
      </div>
    </div>
  );
};

export default Books;
