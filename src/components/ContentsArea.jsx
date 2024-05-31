import AddModal from "./AddModal";

const ContentsArea = ({ chapter }) => {
  if (!chapter) {
    return <p>Loading...</p>;
  }
  
  return (
    <>
      <h1>{chapter.chapter_title}</h1>
      <div>
        {chapter.contents.map((content) => {
          return (
            <div key={content._id}>
              <h2>{content.heading_title}</h2>
              {content.content}
            </div>
          );
        })}
        <AddModal isContents={true} />
      </div>
    </>
  );
};

export default ContentsArea;
