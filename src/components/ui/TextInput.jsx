import { css } from "@emotion/react";

const labelStyle = css`
  font-size: 0.9rem;
  font-weight: 600;
`;

const textInputStyle = css`
  max-width: 100%;
  height: 40px;
  margin-bottom: 20px;
  border: 1px solid rgb(185 184 184);
  border-radius: 4px;
  padding: 0 10px;
`;

const TextInput = ({ label, placeholder, name, value, onChange }) => {
  return (
    <>
      <label css={labelStyle} htmlFor={label}>
        {label}
      </label>
      <input
        type="text"
        css={textInputStyle}
        id={label}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default TextInput;
