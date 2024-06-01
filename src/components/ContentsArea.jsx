import AddModal from "./AddModal";
import { css } from "@emotion/react";

const contentStyles = css`
  flex: 1; 
  max-width: 1000px;
  margin-left: 80px;
  padding: 20px;
  background-color: #ffffff;
`;

const ContentsArea = ({ chapter }) => {
  if (!chapter) {
    return <p>Loading...</p>;
  }

  return (
    <div css={contentStyles}>
      {chapter.contents.map((content) => {
        return (
          <div id={content._id} key={content._id}>
            <h2>{content.heading_title}</h2>
            {content.content}
          </div>
        );
      })}
      <AddModal isContents={true} />
    </div>
  );
};

export default ContentsArea;
