import { css } from "@emotion/react";
import { useFormContext } from "react-hook-form";
import { errorMessageStyle } from "../../styles/styles";
import TextareaAutosize from "react-textarea-autosize";

const labelStyle = css`
  font-size: 0.9rem;
  font-weight: 600;
`;

const textareaStyle = css`
  max-width: 100%;
  height: 800px;
  margin-bottom: 10px;
  border: 1px solid rgb(185 184 184);
  border-radius: 4px;
  padding: 10px;
`;

const errorBorderStyle = css`
  border: 1px solid red;
`;

const Textarea = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  required,
  defaultValue,
  maxLength,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <label css={labelStyle} htmlFor={label}>
        {label}
      </label>
      <TextareaAutosize
        css={[textareaStyle, errors[name] && errorBorderStyle]}
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
            message: `${label}は最大${maxLength}文字までです。`,
          },
        })}
        minRows={10}
        maxRows={18}
      />
      {errors[name] && <p css={errorMessageStyle}>{errors[name].message}</p>}
    </>
  );
};

export default Textarea;
