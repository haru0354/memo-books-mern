import { css } from "@emotion/react";

const buttonStyle = (color) => css`
  cursor: pointer;
  width: 180px;
  height: 40px;
  margin-bottom: 1rem;
  background-color: #e7e7e7;
  border: 1px solid;
  border-radius: 4px;
  font-weight: 600;
  color: white;
  background-color: ${color === "blue"
    ? "#1d78c9"
    : color === "red"
    ? "#c91d3b"
    : color === "gray"
    ? "#939393"
    : "#FFFFFF"};

  &:hover {
    color: rgb(55 65 81);
    background-color: white;
    border: 1px solid;
    border-color: ${color === "blue"
      ? "#1d78c9"
      : color === "red"
      ? "#c91d3b"
      : color === "gray"
      ? "#939393"
      : "#FFFFFF"};
  }
`;

const Button = ({ children, onClick, color, type, addCss }) => {
  return (
    <button type={type} css={[buttonStyle(color), addCss]} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
