import AddModal from "./AddModal";
import { css } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { RightContent } from "../styles/styles";
import { Link } from "react-router-dom";

const tableOfContentsStyle = css`
  max-width: 380px;
  margin: 0 auto;
  padding: 0.2rem 2rem;
  border: 1px solid #cbc9c9;
  border-radius: 4px;

  p {
    text-align: center;
    border-bottom: 1px dotted #898989;
    padding-bottom: 4px;
  }

  li {
    color: #1168ca;
    margin-right: 0px;
    margin-bottom: 1rem;
    cursor: pointer;

    &:hover {
      color: #ff2300;
    }

    svg {
      margin-right: 16px;
    }
  }
`;

const contentAreaStyle = css`
  padding-top: 1rem;
  padding-bottom: 2rem;
  border-bottom: 1px dotted gray;
`;

const h2Styles = css`
  font-size: 1.4rem;
  margin-bottom: 2rem;
`;

const ContentsArea = ({ chapter, bookId }) => {
  if (!chapter) {
    return <p>Loading...</p>;
  }

  const scrollToTitle = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div css={RightContent}>
      <h1>{chapter.chapter_title}</h1>
      <div css={tableOfContentsStyle}>
        <p>目次</p>
        <ul>
          {chapter.contents.map((content) => {
            return (
              <li key={content._id} onClick={() => scrollToTitle(content._id)}>
                <FontAwesomeIcon icon={faChevronDown} />
                {content.heading_title}
              </li>
            );
          })}
        </ul>
      </div>
      <Link to={`/edit/${bookId}/${chapter._id}`}>チャプターの編集</Link>
      {chapter.contents.map((content) => {
        return (
          <div css={contentAreaStyle} id={content._id} key={content._id}>
            <h2 css={h2Styles}>{content.heading_title}</h2>
            {content.content}
          </div>
        );
      })}
      <AddModal isContents={true} formTitle="コンテンツ" />
    </div>
  );
};

export default ContentsArea;
