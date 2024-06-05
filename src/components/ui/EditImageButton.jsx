import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { css } from "@emotion/react";

const buttonStyle = css`
  cursor: pointer;
  width: 35px;
  height: 30px;
  background-color: gray;
  border: 1px dotted gray;
  border-radius: 4px;

  &:hover {
    background-color: #e3e3e3;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const EditImageButton = ({ onClick }) => {
  return (
    <>
      <button onClick={onClick} css={buttonStyle}>
        <FontAwesomeIcon icon={faPenToSquare} />
      </button>
    </>
  );
};

export default EditImageButton;
