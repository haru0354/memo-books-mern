import { css } from "@emotion/react";

const buttonStyle = css`
  cursor: pointer;
  width: 180px;
  height: 40px;
  margin-bottom: 1rem;
  background-color: #e7e7e7;
  border: 1px solid rgb(185 184 184);
  border-radius: 4px;

  &:hover {
    color: black;
    background-color: white;
  }
`;

const Button = ({ children, onClick }) => {
  return (
    <button css={buttonStyle} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
