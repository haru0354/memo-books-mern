import AddModal from "./AddModal";
import { Link } from "react-router-dom";

const ChapterList = ({ chapters, bookId }) => {
  return (
    <div className="chapter">
      <ul>
        {chapters.map((chapter) => {
          return <li key={chapter._id}><Link to={`/${bookId}/${chapter._id}`}>{chapter.chapter_title}</Link></li>;
        })}
      </ul>
      <AddModal />
    </div>
  );
};

export default ChapterList;
