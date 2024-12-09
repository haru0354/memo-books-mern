import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordAsync, logout } from "../store/slice/userSlice";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { css } from "@emotion/react";
import {
  buttonContainerStyle,
  errorMessageStyle,
  formStyle,
  modalBackStyle,
  modalContainerStyle,
} from "../styles/styles";
import useToast from "../hooks/useToast";
import AgainAuth from "./deleteAccount/AgainAuth";
import TextInput from "../components/ui/TextInput";
import Button from "../components/ui/Button";

const centerStyle = css`
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: center;
`;

const ChangePassword = () => {
  const [isChangePasswordModal, setIsChangePasswordModal] = useState(false);
  const [changeNewPassword, setChangeNewPassword] = useState(null);
  const methods = useForm();
  const showToast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error, againAuth } = useSelector((state) => state.user);

  const handleChangePassword = async (data) => {
    const newPassword = data.password;

    try {
      const result = await dispatch(changePasswordAsync(newPassword)).unwrap();

      if (result === "パスワードが変更されました。") {
        showToast("パスワードを変更しました");
        await dispatch(logout()).unwrap();
        navigate("/");
      }
    } catch (error) {
      if (error === "再認証が必要です") {
        showToast("再認証が必要です");
        setChangeNewPassword(data);  //失敗した場合にフォームのdataを入れる
      } else {
        showToast("パスワードの変更に失敗しました。");
        console.error("パスワードの変更に失敗しました。", error);
      }
    }
  };

  // 再認証が成功した時に実行される関数
  const handleAgainAuthSuccessChangePassword = async () => {
    if (changeNewPassword) {
      await handleChangePassword(changeNewPassword); //失敗した場合にフォームのdataが渡る
      setChangeNewPassword(null);  
    }
  };

  const toggleChangePasswordModal = () => {
    setIsChangePasswordModal((prev) => !prev);
  };

  const closeChangePasswordModal = (e) => {
    if (e.target === e.currentTarget) {
      setIsChangePasswordModal((prev) => !prev);
    }
  };

  return (
    <>
      <div css={centerStyle}>
        <Button color="blue" onClick={toggleChangePasswordModal}>
          パスワードの変更
        </Button>
      </div>
      {isChangePasswordModal && (
        <div css={modalBackStyle} onClick={closeChangePasswordModal}>
          <div css={modalContainerStyle}>
            <h3>パスワードの変更</h3>
            {againAuth ? (
              <AgainAuth handleAgainAuthSuccessChangePassword={handleAgainAuthSuccessChangePassword} />
            ) : (
              <FormProvider {...methods}>
                <form
                  css={formStyle}
                  onSubmit={methods.handleSubmit(handleChangePassword)}
                >
                  <TextInput
                    label="パスワード"
                    name="password"
                    placeholder="8～12文字で入力してください"
                    required={true}
                    maxLength={12}
                    minLength={8}
                  />
                  {methods.formState.errors.password && (
                    <span css={errorMessageStyle}>
                      {methods.formState.errors.password.message}
                    </span>
                  )}
                  {error && <p css={errorMessageStyle}>{error}</p>}
                  <div css={buttonContainerStyle}>
                    <Button type="submit" color="blue">
                      変更
                    </Button>
                    <Button
                      type="button"
                      color="gray"
                      onClick={toggleChangePasswordModal}
                    >
                      キャンセル
                    </Button>
                  </div>
                </form>
                {status === "loading" && <p>パスワードの変更中</p>}
              </FormProvider>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ChangePassword;
