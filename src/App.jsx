import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Global, css } from "@emotion/react";

import Home from "./pages/Home";
import Page404 from "./pages/Page404";
import Footer from "./components/Footer";
import Books from "./pages/Books";
import Book from "./pages/Book";
import Chapter from "./pages/Chapter";

const globalStyles = css`
  #root {
    font-family: Inter, sans-serif;
    line-height: 2;
    max-width: 1280px;
    min-width: 320px;
    padding: 2rem;
  }

  body {
    margin: 0;
    display: flex;
    place-items: center;
  }

  a {
    font-weight: 500;
    color: #646cff;
    text-decoration: inherit;

    &:hover {
      color: #fc5897;
    }
  }
`;

function App() {
  return (
    <BrowserRouter>
      <Global styles={globalStyles} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:bookId" element={<Book />} />
        <Route path="/:bookId/:chapterId" element={<Chapter />} />
        <Route path="/*" element={<Page404 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
