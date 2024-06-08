import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Global, css } from "@emotion/react";
import "normalize.css";
import { HelmetProvider } from "react-helmet-async"
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Chapter from "./pages/Chapter";
import Book from "./pages/Book";
import Page404 from "./pages/Page404";

const globalStyles = css`
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap");

  body {
    font-family: "Noto Sans JP", sans-serif;
    margin: 0;
    color: rgb(55 65 81);
    display: flex;
    flex-direction: column;
    background-color: #fffaf1;
    line-height: 30px;

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
      <HelmetProvider>
        <Global styles={globalStyles} />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/:bookId" element={<Book />} />
            <Route path="/:bookId/:chapterId" element={<Chapter />} />
            <Route path="*" element={<Page404 />} />
          </Route>
        </Routes>
      </HelmetProvider>
    </BrowserRouter>
  );
}

export default App;
