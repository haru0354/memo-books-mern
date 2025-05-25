import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { css } from "@emotion/react";

const buttonStyle = css`
  cursor: pointer;
  width: 35px;
  height: 30px;
  background-color: #e3e3e3;
  border: 1px dotted gray;
  border-radius: 4px;

  &:hover {
    background-color: #5c5c5c;
    color: #e3e3e3;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const EditImageButton = ({ onClick }) => {
  return (
    <>
      <button type="button" onClick={onClick} css={buttonStyle}>
        <FontAwesomeIcon icon={faPenToSquare} />
      </button>
    </>
  );
};

export default EditImageButton;
