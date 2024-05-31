import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer"
import Page404 from "./pages/Page404";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<Page404 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
