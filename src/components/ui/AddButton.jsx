import { css } from "@emotion/react";

const buttonStyle = css`
  width: 100%;
  height: 30px;

  &:hover {
    color: black;
    background-color: #ffffff;
  }
`;

const AddButton = ({ onClick, addCss }) => {
  return (
    <button css={[ buttonStyle, addCss ]} onClick={onClick}>
      +
    </button>
  );
};

export default AddButton;
