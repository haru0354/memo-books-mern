import React from "react";
import { css } from "@emotion/react";
import { useFormContext } from "react-hook-form";
import { errorMessageStyle } from "../../styles/styles";

const textInputContainer = css`
  width: 100%;
`;

const labelStyle = css`
  width: 100%;
  font-size: 0.9rem;
  font-weight: 600;
`;

const textInputStyle = css`
  width: 100%;
  height: 40px;
  margin-bottom: 6px;
  border: 1px solid rgb(185 184 184);
  border-radius: 4px;
  padding: 0 10px;
  box-sizing: border-box;
`;

const errorBorderStyle = css`
  border: 1px solid red;
`;

const TextInput = React.forwardRef(
  (
    {
      label,
      type = "text",
      placeholder,
      name,
      value,
      onChange,
      required,
      maxLength,
      minLength,
      defaultValue,
    },
    ref
  ) => {
    const {
      register,
      formState: { errors },
    } = useFormContext();

    return (
      <div css={textInputContainer}>
        <label css={labelStyle} htmlFor={label}>
          {label}
        </label>
        <input
          type={type}
          css={[textInputStyle, errors[name] && errorBorderStyle]}
          id={label}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          defaultValue={defaultValue}
          ref={ref}
          {...register(name, {
            required: required && `${label}の入力は必須です`,
            maxLength: maxLength && {
              value: maxLength,
              message: `${label}は最大${maxLength}文字までです。`,
            },
            minLength: minLength && {
              value: minLength,
              message: `${label}は${minLength}文字以上です。`,
            },
          })}
        />
        {errors[name] && <p css={errorMessageStyle}>{errors[name].message}</p>}
      </div>
    );
  }
);

export default TextInput;
