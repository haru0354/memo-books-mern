import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Global, css } from "@emotion/react";

import Home from "./pages/Home";
import Page404 from "./pages/Page404";
import Books from "./pages/Books";
import Book from "./pages/Book";
import Chapter from "./pages/Chapter";
import EditChapter from "./pages/EditChapter";
import Header from "./components/Header";
import Layout from "./components/Layout";

const globalStyles = css`
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap");

  body {
    font-family: "Noto Sans JP", sans-serif;
    margin: 0;
    color: rgb(55 65 81);
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    ul {
      list-style-type: none;
    }

    a {
      text-decoration: none;
    }
  }
`;

function App() {
  return (
    <BrowserRouter>
      <Global styles={globalStyles} />
      <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/:bookId" element={<Book />} />
        <Route path="/:bookId/:chapterId" element={<Chapter />} />
        <Route path="/edit/:bookId/:chapterId" element={<EditChapter />} />
        <Route path="/*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
