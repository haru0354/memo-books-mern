import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer"
import Page404 from "./pages/Page404";
import Books from "./pages/Books";
import Chapter from "./pages/Chapter";
import Book from "./pages/Book";
import { Global, css } from '@emotion/react';

const globalStyles = css`
  h2 {
    color: #333;
    font-size: 2rem;
    font-weight: bold;
    margin: 20px 0;
    padding: 0;
    text-align: center;
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
