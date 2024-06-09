import { css } from "@emotion/react";

const buttonStyle = css`
  cursor: pointer;
  margin: 0 10px;
  padding: 8px 10px;
  list-style-type: none;
  background-color: #fffdfb;
  border: none
  
  ;
  &:hover {
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
