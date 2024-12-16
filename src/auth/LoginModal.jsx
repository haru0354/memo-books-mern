import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/slice/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { css } from "@emotion/react";
import { modalBackStyle } from "../styles/styles";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../lib/schema";
import { errorMessageStyle } from "../styles/styles";
import useToast from "../hooks/useToast";
import AnimationItem from "../lib/AnimationItem";
import Button from "../components/ui/Button";
import TextInput from "../components/ui/TextInput";
import AuthButton from "../components/ui/AuthButton";

const formContainerStyle = css`
  width: 100%;
  max-width: 300px;
  padding: 20px;
  margin: 0 auto;
  background-color: #fffdfb;
  border-radius: 4px;
`;

const textCenterStyle = css`
  margin-top: 10px;
  text-align: center;
`;

const formTextStyle = css`
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 4px;
  border-bottom: 1px dashed gray;
  font-weight: 600;
`;

const menuContainerStyle = css`
  position: relative;
  display: inline-block;
`;

const menuUlStyle = css`
  position: absolute;
  width: 200px;
  padding-left: 0px;
  border-top: 1px solid rgb(193 193 193);
  border-left: 1px solid rgb(193 193 193);
  border-right: 1px solid rgb(193 193 193);
  background-color: #fffdfb;
  top: 100%;
  right: 0px;
  z-index: 1;
`;

const menuTextStyle = css`
  cursor: pointer;
  text-align: center;
  width: 100%;
  padding: 4px 0;
  border-bottom: 1px solid rgb(193 193 193);
  position: relative;

  &:hover {
    color: #e3e3e3;
    background-color: #5c5c5c;
  }
`;

const formStyle = css`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const LoginModal = () => {
  const [isLoginModal, setIsLoginModal] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const methods = useForm({ resolver: zodResolver(formSchema) });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const showToast = useToast();

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
      await dispatch(login({ email, password })).unwrap();

      toggleCloseModal();
      showToast("ログインに成功しました");
      navigate("/books");
    } catch (error) {
      showToast("ログインに失敗しました");
      console.error("ログインに失敗しました", error);
    }
  };

  const onLogout = async () => {
    await dispatch(logout()).unwrap();
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

  const toggleOpenMenu = () => {
    setIsOpenMenu((prev) => !prev);
  };

  return (
    <>
      {user ? (
        <div css={menuContainerStyle}>
          <AuthButton onClick={toggleOpenMenu}>MENU</AuthButton>
          {isOpenMenu && (
            <AnimationItem
              elType="ul"
              animation="fadeInOpacity"
              emotionCss={menuUlStyle}
            >
              <Link to="/books">
                <li css={menuTextStyle} onClick={toggleOpenMenu}>
                  メモブックの一覧
                </li>
              </Link>
              <Link to="/setting">
                <li css={menuTextStyle} onClick={toggleOpenMenu}>
                  設定
                </li>
              </Link>
              <li css={menuTextStyle} onClick={onLogout}>
                ログアウト
              </li>
              <li css={menuTextStyle} onClick={toggleOpenMenu}>
                閉じる
              </li>
            </AnimationItem>
          )}
        </div>
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
                    <span css={formTextStyle}>ログイン</span>
                    <TextInput
                      label="メールアドレス"
                      placeholder="メールアドレスを入力してください"
                      name="email"
                    />
                    <TextInput
                      type="password"
                      label="パスワード"
                      placeholder="8～12文字で入力してください"
                      name="password"
                    />
                    {methods.formState.errors.email && (
                      <span css={errorMessageStyle}>
                        {methods.formState.errors.email.message}
                      </span>
                    )}
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
