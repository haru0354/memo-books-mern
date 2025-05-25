import { useDispatch, useSelector } from "react-redux";
import { againAuthAsync } from "../../store/slice/userSlice";
import { FormProvider, useForm } from "react-hook-form";
import { css } from "@emotion/react";
import { errorMessageStyle, formStyle } from "../../styles/styles";
import useToast from "../../hooks/useToast";
import Button from "../../components/ui/Button";
import TextInput from "../../components/ui/TextInput";

const container = css`
  margin: 20px;
  border: 1px dashed gray;
`;

const addFormStyle = css`
  margin-bottom: 20px;
`;

const addButtonStyle = css`
  margin: 0 auto;
`;

const againAuthText = css`
  margin: 10px 20px;
  font-size: 14px;
`;

const AgainAuth = ({
  handleDeleteUser,
  handleAgainAuthSuccessChangePassword,
}) => {
  const methods = useForm();
  const dispatch = useDispatch();
  const showToast = useToast();
  const { status, error } = useSelector((state) => state.user);

  const handleAgainAuth = async (data) => {
    const password = data.password;

    try {
      const result = await dispatch(againAuthAsync(password)).unwrap();

      if (result === "再認証に成功しました。") {
        if (handleDeleteUser) {
          handleDeleteUser();
        }
        if (handleAgainAuthSuccessChangePassword) {
          handleAgainAuthSuccessChangePassword();
        }
      }
    } catch (error) {
      showToast("再認証に失敗しました。");
      console.error("再認証に失敗しました。", error);
    }
  };

  return (
    <div css={container}>
      <FormProvider {...methods}>
        <form
          css={[formStyle, addFormStyle]}
          onSubmit={methods.handleSubmit(handleAgainAuth)}
        >
          <TextInput
            label="パスワード"
            placeholder="8～12文字で入力してください"
            name="password"
            required={true}
            maxLength={12}
            minLength={8}
          />
          <Button type="submit" color="red" addCss={addButtonStyle}>
            再認証
          </Button>
        </form>
      </FormProvider>
      {status === "loading" && <p>再認証中</p>}
      {error && <p css={errorMessageStyle}>{error}</p>}
      <p css={againAuthText}>
        アカウントの所有者確認の為、パスワードを入力してください。
      </p>
    </div>
  );
};

export default AgainAuth;
