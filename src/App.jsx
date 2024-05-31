import { useState } from "react";
import "./App.css";
import Button from "./components/ui/Button";
import TextInput from "./components/ui/TextInput";
import Textarea from "./components/ui/Textarea";
import Footer from "./components/Footer";
import DeleteModal from "./components/DeleteModal";
import AddModal from "./components/AddModal";
import ChapterList from "./components/ChapterList";
import ContentsArea from "./components/ContentsArea";

function App() {
  const [count, setCount] = useState(0);

  const chapter = {
    chapter_title: "チャプタータイトル",
    contents: [
      {
        heading_title: "aa",
        content: "00",
      },
      {
        heading_title: "bb",
        content: "11",
      },
      {
        heading_title: "cc",
        content: "22",
      },
    ],
  };

  const chapters = [
    {
      id: "0",
      chapter_title: "aaa",
    },
    {
      id: "1",
      chapter_title: "bbb",
    },
  ];

  return (
    <>
      <h1>Vite00 + React</h1>
      <ChapterList chapters={chapters} />
      <ContentsArea chapter={chapter} />
      <DeleteModal title="b" />
      <Footer />
    </>
  );
}

export default App;
