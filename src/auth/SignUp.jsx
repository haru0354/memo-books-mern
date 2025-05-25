import { useDispatch, useSelector } from "react-redux";
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
  max-width: 300px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  border-radius: 4px;
  background-color: #fffdfb;
`;

const textCenterStyle = css`
  margin-top: 15px;
  text-align: center;
`;

const FormTextStyle = css`
  margin-bottom: 1rem;
  padding-bottom: 4px;
  text-align: center;
  font-weight: 600;
  border-bottom: 1px dashed gray;
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
  const user = useSelector((state) => state.user.user);

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
      {user ? (
        <div css={textCenterStyle}>
          <p>すでにログイン中です。</p>
          <Button color="blue" onClick={() => navigate("/books")}>
            メモブックの一覧へ
          </Button>
        </div>
      ) : (
        <FormProvider {...methods}>
          <form css={formStyle} onSubmit={methods.handleSubmit(onSubmit)}>
            <span css={FormTextStyle}>アカウント登録</span>
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
            <div css={textCenterStyle}>
              <Button type="submit" color="blue">
                登録
              </Button>
            </div>
          </form>
        </FormProvider>
      )}
    </div>
  );
};

export default SignUp;
