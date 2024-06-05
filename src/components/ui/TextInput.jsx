import { css } from "@emotion/react";
import { useFormContext } from "react-hook-form";

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

const TextInput = ({ label, placeholder, name, value, onChange, required, maxLength, defaultValue }) => {
  const { register } = useFormContext();

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
        defaultValue={defaultValue}
        {...register(name, {
          required: required && `${label}の入力は必須です`,
          maxLength: maxLength && {
            value: maxLength,
            message: `${label}は最大${maxLength}文字までです。`
          }
        })}
      />
    </>
  );
};

export default TextInput;
