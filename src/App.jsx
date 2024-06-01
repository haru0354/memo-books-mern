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
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    ul {
      list-style-type: none;
      padding: 0;
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
        <Route path="/books/:bookId" element={<Book />} />
        <Route path="/:bookId/:chapterId" element={<Chapter />} />
        <Route path="/*" element={<Page404 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
