import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../store/slice/booksSlice";
import { css } from "@emotion/react";
import { main1ColumnStyle } from "../styles/styles";
import AddBookModal from "../components/book/AddBookModal";
import EditBookModal from "../components/book/EditBookModal";

const bookContainerStyle = css`
  padding: 0 1.6rem;
`;

const addBookContainerStyle = css`
  padding-top: 25px;
  padding-left: 25px;
  padding-right: 25px;
  border-radius: 4px;
`;

const bookTitleStyle = css`
  padding-right: 15px;
  text-align: center;
`;

const BooksAreaStyle = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
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

const scrollStyle = css`
  position: relative;
  display: flex;
  overflow-x: auto;
  gap: 1.5rem;
  margin: 20px 0;
  padding: 2rem 1rem;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.15);
  border: 2px solid #c9b79c;

  &::-webkit-scrollbar {
    height: 12px;
  }

  &::-webkit-scrollbar-track {
    background: #e0d8c9;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #b59d7c;
    border-radius: 10px;
    border: 2px solid #e0d8c9;
  }

  @media (max-width: 960px) {
    margin: 20px 0;
    border: 2px solid #ccc;
    border-radius: 8px;
  }
`;

const Books = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);
  const status = useSelector((state) => state.books.status);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchBooks()).unwrap();
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

  // AddBookModal を最後の1つとして追加
  const booksWithAdd = [...books, { _id: "add", isAdd: true }];

  // 4つずつ分割
  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  const chunkedBooks = chunkArray(booksWithAdd, 4);

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
        <h1>メモブックの一覧</h1>
        <div css={BooksAreaStyle}>
          {chunkedBooks.map((row, index) => (
            <div css={scrollStyle} key={index}>
              {row.map((book) =>
                book.isAdd ? (
                  <div css={addBookContainerStyle} key="add">
                    <AddBookModal />
                  </div>
                ) : (
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
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Books;
