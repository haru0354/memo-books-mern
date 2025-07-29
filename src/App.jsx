import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ToastProvider } from "./context/ToastContext";
import { Global, css } from "@emotion/react";
import "normalize.css";

import useAuthObserver from "./auth/useAuthObserver";
import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Chapter from "./pages/Chapter";
import Book from "./pages/Book";
import Page404 from "./pages/Page404";
import Setting from "./pages/Setting";
import Privacypolicy from "./pages/Privacypolicy";

const globalStyles = css`
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap");

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    font-family: "Noto Sans JP", sans-serif;
    font-size: 16px;
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
      color: #589be3;
    }
  }
`;

function App() {
  useAuthObserver();

  return (
    <BrowserRouter>
      <HelmetProvider>
        <Global styles={globalStyles} />
        <ToastProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<PublicRoute element={<Home />} />} />
              <Route
                path="/books"
                element={<ProtectedRoute element={<Books />} />}
              />
              <Route
                path="/setting"
                element={<ProtectedRoute element={<Setting />} />}
              />
              <Route path="/privacypolicy" element={<Privacypolicy />} />
              <Route
                path="/:bookId"
                element={<ProtectedRoute element={<Book />} />}
              />
              <Route
                path="/:bookId/:chapterId"
                element={<ProtectedRoute element={<Chapter />} />}
              />
              <Route path="*" element={<Page404 />} />
            </Route>
          </Routes>
        </ToastProvider>
      </HelmetProvider>
    </BrowserRouter>
  );
}

export default App;
