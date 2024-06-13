import { useState } from "react";
import { auth } from "./firebase";
import { signOut, updatePassword } from "firebase/auth";
import { css } from "@emotion/react";
import TextInput from "../components/ui/TextInput";
import Button from "../components/ui/Button";
import { FormProvider, useForm } from "react-hook-form";
import { useToast } from "../context/ToastContext";
import {
  buttonContainerStyle,
  formStyle,
  modalBackStyle,
  modalContainerStyle,
} from "../styles/styles";
import { useNavigate } from "react-router-dom";

const centerStyle = css`
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: center;
`;

const ChangePassword = () => {
  const [isChangePasswordModal, setIsChangePasswordModal] = useState(false);
  const methods = useForm();
  const showToast = useToast();
  const navigate = useNavigate();

  const handleChangePassword = async (data) => {
    const user = auth.currentUser;
    const newPassword = data.password;

    try {
      await updatePassword(user, newPassword);
      toggleChangePasswordModal();
      showToast("パスワードを変更しました");
      await signOut(auth);
      navigate("/")
    } catch (error) {
      showToast("パスワードの変更に失敗しました。");
      console.error("パスワードの変更に失敗しました。", error);
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
                <div css={buttonContainerStyle}>
                  <Button type="submit" color="blue">
                    変更
                  </Button>
                  <Button type="button" color="gray" onClick={toggleChangePasswordModal}>
                    キャンセル
                  </Button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      )}
    </>
  );
};

export default ChangePassword;
