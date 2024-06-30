import { css } from "@emotion/react";

const getBackgroundColor = (color) => {
  const colorMap = {
    blue: "#1d78c9",
    red: "#c91d3b",
    gray: "#939393",
  };

  return colorMap[color] || "#FFFFFF";
};


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
  background-color: ${getBackgroundColor(color)};

  &:hover {
    color: rgb(55 65 81);
    background-color: white;
    border: 1px solid;
    border-color: ${getBackgroundColor(color)};
  }
`;

const Button = ({ children, onClick, color, type, addCss, title }) => {
  return (
    <button type={type} css={[buttonStyle(color), addCss]} onClick={onClick} title={title}>
      {children}
    </button>
  );
};

export default Button;
