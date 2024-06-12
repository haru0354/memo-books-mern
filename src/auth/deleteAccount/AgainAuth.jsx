import { useDispatch } from "react-redux";
import { againAuthAsync } from "../../store/slice/userSlice";
import TextInput from "../../components/ui/TextInput";
import Button from "../../components/ui/Button";
import { FormProvider, useForm } from "react-hook-form";
import { css } from "@emotion/react";
import { errorMessageStyle, formStyle } from "../../styles/styles";
import { useToast } from "../../context/ToastContext";

const container = css`
  margin: 0 20px;
  border: 1px dashed gray;
`;

const addButtonStyle = css`
  margin: 0 auto;
`;

const againAuthText = css`
  margin: 10px 20px;
  font-size: 14px;
`;

const AgainAuth = ({ handleDeleteUser }) => {
  const methods = useForm();
  const dispatch = useDispatch();
  const showToast = useToast();
  const { status, error } = useSelector((state) => state.user);

  const handleAgainAuth = async () => {
    const result = await dispatch(againAuthAsync(password));
    if (againAuthAsync.fulfilled.match(result)) {
      if (handleDeleteUser) {
        handleDeleteUser();
      }
    } else {
      showToast(result.payload || "再認証に失敗しました。")
    }
  };

  return (
    <div css={container}>
      <FormProvider {...methods}>
        <form css={formStyle} onSubmit={methods.handleSubmit(handleAgainAuth)}>
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
          <Button type="submit" color="blue" addCss={addButtonStyle}>
            再認証
          </Button>
        </form>
      </FormProvider>
      {status === 'loading' && <p>再認証中...</p>}
      {error && <p css={errorMessageStyle}>{error}</p>}
      <p css={againAuthText}>
        一定期間「ログインボタンによるログイン」を行っていないと、アカウント所有権の確認に、パスワード入力による再認証が必要となる場合があります。
      </p>
    </div>
  );
};

export default AgainAuth;
