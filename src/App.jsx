import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer"
import Page404 from "./pages/Page404";
import Books from "./pages/Books";
import Chapter from "./pages/Chapter";
import Book from "./pages/Book";

function App() {
  return (
    <BrowserRouter>
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
