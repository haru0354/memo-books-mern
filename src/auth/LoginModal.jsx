import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/slice/userSlice";
import { FormProvider, useForm } from "react-hook-form";
import { css } from "@emotion/react";
import { buttonContainerStyle, formStyle, errorMessageStyle } from "../styles/styles";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../lib/schema";
import useToast from "../hooks/useToast";
import AnimationItem from "../lib/AnimationItem";
import Button from "../components/ui/Button";
import TextInput from "../components/ui/TextInput";
import AuthButton from "../components/ui/AuthButton";
import Modal from "../components/modals/Modal";

const formTextStyle = css`
  text-align: center;
  margin-top: 10px;
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

const LoginModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const methods = useForm({ resolver: zodResolver(formSchema) });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const showToast = useToast();

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      await dispatch(login({ email, password })).unwrap();

      toggleModal();
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

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <>
      {user ? (
        <div css={menuContainerStyle}>
          <AuthButton onClick={toggleMenu}>MENU</AuthButton>
          {isMenuOpen && (
            <AnimationItem
              elType="ul"
              animation="fadeInOpacity"
              emotionCss={menuUlStyle}
            >
              <Link to="/books">
                <li css={menuTextStyle} onClick={toggleMenu}>
                  メモブックの一覧
                </li>
              </Link>
              <Link to="/setting">
                <li css={menuTextStyle} onClick={toggleMenu}>
                  設定
                </li>
              </Link>
              <li css={menuTextStyle} onClick={onLogout}>
                ログアウト
              </li>
              <li css={menuTextStyle} onClick={toggleMenu}>
                閉じる
              </li>
            </AnimationItem>
          )}
        </div>
      ) : (
        <>
          <AuthButton onClick={toggleModal}>ログイン</AuthButton>
          <Modal isOpen={isModalOpen} onClose={toggleModal}>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)} css={formStyle}>
                <span css={formTextStyle}>ログイン</span>
                <TextInput
                  label="ログインメールアドレス"
                  placeholder="メールアドレスを入力してください"
                  name="email"
                />
                <TextInput
                  type="password"
                  label="ログインパスワード"
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
                <div css={buttonContainerStyle}>
                  <Button type="submit" color="blue">
                    ログイン
                  </Button>
                  <Button type="submit" color="gray">googleでログイン</Button>
                </div>
              </form>
            </FormProvider>
          </Modal>
        </>
      )}
    </>
  );
};

export default LoginModal;
