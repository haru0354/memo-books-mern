import AddModal from "./AddModal";
import { Link } from "react-router-dom";

const ChapterList = ({ chapters, bookId }) => {
  return (
    <div>
      <ul>
        <li><Link to="/books">本の一覧へ</Link></li>
        <li><Link to={`/books/${bookId}`}>本の詳細へ</Link></li>
        {chapters.map((chapter) => {
          return (
            <li key={chapter._id}>
              <Link to={`/${bookId}/${chapter._id}`}>
                {chapter.chapter_title}
              </Link>
            </li>
          );
        })}
      </ul>
      <AddModal />
    </div>
  );
};

export default ChapterList;
