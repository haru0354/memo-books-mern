import AddModal from "./AddModal";

const ContentsArea = ({ chapter }) => {
  return (
    <>
      <h1>{chapter.chapter_title}</h1>
      <div>
        {chapter.contents.map((content) => {
          return (
            <>
              <h2>{content.heading_title}</h2>
              {content.content}
            </>
          );
        })}
        <AddModal isContents={true} />
      </div>
    </>
  );
};

export default ContentsArea;
