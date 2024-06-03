import { useEffect, useState } from "react";
import bookApi from "../api/book";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const bookData = await bookApi.getAll();
        setBooks(bookData);
      } catch (error) {
        console.error("DBから本の一覧の取得に失敗しました。");
      }
    };

    fetchBooks();
  }, []);

  if (!books) {
    <p>Loading...</p>;
  }

  return (
    <>
      <h2>本の一覧</h2>
      <div>
        {books.map((book) => (
          <div key={book._id}>
            <h2>
              <Link to={`/books/${book._id}`}>{book.title}</Link>
            </h2>
          </div>
        ))}
      </div>
    </>
  );
};

export default Books;
