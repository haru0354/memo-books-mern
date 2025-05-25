import { useState } from "react";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { css } from "@emotion/react";
import Button from "../ui/Button";

const container = css`
  cursor: pointer;
  margin: 10px auto;
  border: 1px solid rgb(193 193 193);
  border-radius: 4px;
  padding: 20px;
  background-color: #fffdfb;
`;

const qaStyle = css`
  display: flex;
  align-items: center;
  justify-content: start;
`;

const h3Style = css`
  margin-left: 20px;
`;

const buttonAddStyle = css`
  width: 40px;
  margin-bottom: 0;
  font-size: 1.5rem;
`;

const QaSection = ({ title, text }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div css={container} onClick={toggleOpen}>
      <div css={qaStyle}>
        <Button type="button" color="gray" addCss={buttonAddStyle} title="回答の開閉ボタン">
          {isOpen ? (
            <FontAwesomeIcon icon={faMinus} />
          ) : (
            <FontAwesomeIcon icon={faPlus} />
          )}
        </Button>
        <h3 css={h3Style}>{title}</h3>
      </div>
      {isOpen && <p>{text}</p>}
    </div>
  );
};

export default QaSection;
