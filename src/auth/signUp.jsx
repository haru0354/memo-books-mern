import { css } from "@emotion/react";
import { FormProvider, useForm } from "react-hook-form";
import TextInput from "../components/ui/TextInput";
import Button from "../components/ui/Button";
import { createUser } from "../store/slice/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from "../lib/schema";
import { useToast } from "../context/ToastContext";

const formContainerStyle = css`
  width: 100%;
  max-width: 300px;
  padding: 20px;
  margin: 0 auto;
  background-color: #fffdfb;
  border-radius: 4px;
`;

const textCenterStyle = css`
  text-align: center;
`;

const FormTextStyle = css`
  text-align: center;
  margin-bottom: 1rem;
  padding-bottom: 4px;
  border-bottom: 1px dashed gray;
  font-weight: 600;
`;

const errorMessageStyle = css`
  font-size: 0.8rem;
  color: red;
  margin-bottom: 5px;
`;

const formStyle = css`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const SignUp = () => {
  const methods = useForm({ resolver: zodResolver(formSchema) });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showToast = useToast();

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      await dispatch(createUser({ email, password })).unwrap();
      showToast("アカウントが作成されました")
      navigate("/books");
    } catch (error) {
      showToast("アカウントの作成に失敗しました。")
      console.error("アカウントの作成に失敗しました。", error);
    }
  };

  return (
    <div css={formContainerStyle} id="form">
      <FormProvider {...methods}>
        <form css={formStyle} onSubmit={methods.handleSubmit(onSubmit)}>
          <span css={FormTextStyle}>アカウント登録</span>
          <TextInput
            label="メールアドレス"
            placeholder="メールアドレスを入力してください"
            name="email"
            required={true}
          />
          {methods.formState.errors.email && (
            <span css={errorMessageStyle}>
              {methods.formState.errors.email.message}
            </span>
          )}
          <TextInput
            label="パスワード"
            placeholder="8～12文字で入力してください"
            name="password"
            required={true}
          />
          {methods.formState.errors.password && (
            <span css={errorMessageStyle}>
              {methods.formState.errors.password.message}
            </span>
          )}
          <div css={textCenterStyle}>
            <Button type="submit" color="blue">
              登録
            </Button>
            <Button color="gray">googleでログイン</Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default SignUp;
