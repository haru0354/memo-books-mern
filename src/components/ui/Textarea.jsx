import TextareaAutosize from "react-textarea-autosize";
import { css } from "@emotion/react";

const labelStyle = css`
  font-size: 0.9rem;
  font-weight: 600;
`;

const textareaStyle = css`
  max-width: 100%;
  font-size: 0.9rem;
  height: 800px;
  margin-bottom: 20px;
  border: 1px solid rgb(185 184 184);
  border-radius: 4px;
  padding: 10px;
`;

const Textarea = ({ label, name, placeholder }) => {
  return (
    <>
      <label css={labelStyle} htmlFor={label}>
        {label}
      </label>
      <TextareaAutosize
        css={textareaStyle}
        id={label}
        name={name}
        placeholder={placeholder}
        minRows={10}
        maxRows={18}
      />
    </>
  );
};

export default Textarea;
