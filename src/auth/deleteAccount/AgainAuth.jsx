import { useDispatch } from "react-redux";
import { againAuthAsync } from "../../store/slice/userSlice";
import TextInput from "../../components/ui/TextInput";
import Button from "../../components/ui/Button";
import { FormProvider, useForm } from "react-hook-form";

const AgainAuth = ({ handleDeleteUser }) => {
  const methods = useForm();
  const dispatch = useDispatch();

  const handleAgainAuth = async () => {
    const result = await dispatch(againAuthAsync(password));
    if (againAuthAsync.fulfilled.match(result)) {
      // トーストの実装に切り替える
      alert("再認証が成功しました。");
      if (handleDeleteUser) {
        handleDeleteUser();
      }
    } else {
      // トーストの実装に切り替える
      alert(result.payload || "再認証に失敗しました。");
    }
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleAgainAuth)}>
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
          <Button type="submit" color="blue">
            再認証
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default AgainAuth;
