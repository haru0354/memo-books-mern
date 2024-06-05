import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Global, css } from "@emotion/react";

import Home from "./pages/Home";
import Page404 from "./pages/Page404";
import Books from "./pages/Books";
import Book from "./pages/Book";
import Chapter from "./pages/Chapter";
import EditBook from "./pages/EditBook";
import EditChapter from "./pages/EditChapter";

const globalStyles = css`
  #root {
    font-family: Inter, sans-serif;
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    ul {
      list-style-type: none;
      padding: 0;
    }

    a {
      text-decoration: none;
    }
  }

  body {
    margin: 0;
  }
`;

function App() {
  return (
    <BrowserRouter>
      <Global styles={globalStyles} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/:bookId" element={<Book />} />
        <Route path="/edit/:bookId" element={<EditBook />} />
        <Route path="/:bookId/:chapterId" element={<Chapter />} />
        <Route path="/edit/:bookId/:chapterId" element={<EditChapter />} />
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
