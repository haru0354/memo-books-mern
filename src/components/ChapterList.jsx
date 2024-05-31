import AddModal from "./AddModal";

const ChapterList = ({ chapters }) => {
  return (
    <div className="chapter">
      <ul>
        {chapters.map((chapter) => {
          return <li key={chapter.id}>{chapter.chapter_title}</li>;
        })}
      </ul>
      <AddModal />
    </div>
  );
};

export default ChapterList;
