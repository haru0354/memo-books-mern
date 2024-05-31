const ChapterList = ({ chapters }) => {
  return (
    <div className="chapter">
      <ul>
        {chapters.map((chapter) => {
          return <li key={chapter.id}>{chapter.chapter_title}</li>;
        })}
      </ul>
    </div>
  );
};

export default ChapterList;
