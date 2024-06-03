import { css } from "@emotion/react";

const labelStyle = css`
  font-size: 0.9rem;
  font-weight: 600;
`;

const textInputStyle = css`
  max-width: 100%;
  height: 35px;
  margin-bottom: 20px;
  border: 1px solid rgb(185 184 184);
  border-radius: 4px;
  padding: 0 10px;
`;

const TextInput = ({ label = "", placeholder, name }) => {
  return (
    <>
      <label css={labelStyle} htmlFor={label}>{label}</label>
      <input type="text" css={textInputStyle} name={name} placeholder={placeholder} />
    </>
  );
};

export default TextInput;
