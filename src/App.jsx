import { useState } from "react";
import "./App.css";
import Button from "./components/ui/Button";
import TextInput from "./components/ui/TextInput";
import Textarea from "./components/ui/Textarea";
import Footer from "./components/Footer";
import DeleteModal from "./components/DeleteModal";
import AddModal from "./components/AddModal";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Vite00 + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <Button>ボタン</Button>
      <TextInput label="aa" placeholder="as" />
      <Textarea label="aa" placeholder="aas" />
      <DeleteModal title="b" />
      <AddModal isContents={true} />
      <Footer />
    </>
  );
}

export default App;
