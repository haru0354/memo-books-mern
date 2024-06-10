import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/slice/userSlice";
import { FormProvider, useForm } from "react-hook-form";
import { formStyle, modalBackStyle } from "../styles/styles";
import { css } from "@emotion/react";
import Button from "../components/ui/Button";
import TextInput from "../components/ui/TextInput";
import AuthButton from "../components/ui/AuthButton";
import { useNavigate } from "react-router-dom";

const formContainerStyle = css`
  width: 100%;
  max-width: 300px;
  height: 350px;
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
  margin-bottom: 20px;
  padding-bottom: 4px;
  border-bottom: 1px dashed gray;
  font-weight: 600;
`;

const errorMessageStyle = css`
  font-size: 0.8rem;
  color: red;
  margin-bottom: 5px;
`;

const LoginModal = () => {
  const [isLoginModal, setIsLoginModal] = useState(false);
  const methods = useForm();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const bodyRef = useRef(document.body);

  const disableScroll = () => {
    bodyRef.current.style.overflowY = "hidden";
  };

  const enableScroll = () => {
    bodyRef.current.style.overflow = "auto";
  };

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      await dispatch(login({ email, password }));

      toggleCloseModal();
      navigate("/books");
    } catch (error) {
      console.error("ログインに失敗しました", error);
      console.log("ログインに失敗しました");
    }
  };

  const onLogout = async () => {
    await dispatch(logout());
    navigate("/");
  };

  const toggleOpenModal = () => {
    setIsLoginModal((prev) => !prev);
    disableScroll();
  };

  const toggleCloseModal = () => {
    setIsLoginModal((prev) => !prev);
    enableScroll();
  };

  const closeModal = (e) => {
    if (e.target === e.currentTarget) {
      toggleCloseModal();
      enableScroll();
    }
  };

  return (
    <>
      {user ? (
        <AuthButton onClick={onLogout}>ログアウト</AuthButton>
      ) : (
        <>
          <AuthButton onClick={toggleOpenModal}>ログイン</AuthButton>
          {isLoginModal && (
            <div css={modalBackStyle} onClick={closeModal}>
              <div css={formContainerStyle}>
                <FormProvider {...methods}>
                  <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    css={formStyle}
                  >
                    <span css={FormTextStyle}>ログイン</span>
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
                      maxLength={12}
                      minLength={8}
                    />
                    {methods.formState.errors.password && (
                      <span css={errorMessageStyle}>
                        {methods.formState.errors.password.message}
                      </span>
                    )}
                    <div css={textCenterStyle}>
                      <Button type="submit" color="blue">
                        ログイン
                      </Button>
                      <Button color="gray">googleでログイン</Button>
                    </div>
                  </form>
                </FormProvider>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default LoginModal;
