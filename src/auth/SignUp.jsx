import { useDispatch } from "react-redux";
import { createUser } from "../store/slice/userSlice";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../lib/schema";
import { css } from "@emotion/react";
import useToast from "../hooks/useToast";
import TextInput from "../components/ui/TextInput";
import Button from "../components/ui/Button";

const formContainerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const formStyle = css`
  display: flex;
  flex-direction: column;
  align-items: start;
  max-width: 340px;
  width: 100%;
  padding: 20px;
  border-radius: 4px;
  background-color: #fffdfb;
`;

const FormTitleStyle = css`
  width: 100%;
  text-align: center;
  font-weight: 600;
  margin-bottom: 1rem;
  padding-bottom: 4px;
  border-bottom: 1px dashed gray;
`;

const createButtonStyle = css`
  display: block;
  padding-right: 60px;
  padding-left: 60px;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
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
      showToast("アカウントが作成されました");
      navigate("/books");
    } catch (error) {
      showToast("アカウントの作成に失敗しました。");
      console.error("アカウントの作成に失敗しました。", error);
    }
  };

  return (
    <div css={formContainerStyle} id="form">
      <FormProvider {...methods}>
        <form css={formStyle} onSubmit={methods.handleSubmit(onSubmit)}>
          <span css={FormTitleStyle}>アカウント登録</span>
          <TextInput
            type="email"
            label="メールアドレス"
            placeholder="メールアドレスを入力してください"
            name="email"
            required={true}
          />
          <TextInput
            type="password"
            label="パスワード"
            placeholder="8～12文字で入力してください"
            name="password"
            required={true}
          />
          <Button type="submit" color="blue" addCss={createButtonStyle}>
            登録
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default SignUp;
