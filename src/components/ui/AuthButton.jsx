import { css } from "@emotion/react";

const buttonStyle = css`
  cursor: pointer;
  padding: 10px 12px;
  font-weight: 600;
  color: white;
  background-color: #a9a9a9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: none;
  list-style-type: none;

  &:hover {
    color: #6c6c6c;
    background-color: #dfdfdf;
  }
`;

const AuthButton = ({ children, onClick }) => {
  return (
    <button type="button" css={buttonStyle} onClick={onClick}>
      {children}
    </button>
  );
};

export default AuthButton;
