import { useDispatch } from "react-redux";
import { addChaptersAsync } from "../../store/slice/chaptersSlice";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import { formStyle } from "../../styles/styles";
import { RightContent } from "../../styles/styles";
import { FormProvider, useForm } from "react-hook-form";
import useToast from "../../hooks/useToast";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";

const formContainerStyle = css`
  margin: 4rem 4rem;
`;

const textStyle = css`
  text-align: center;
`;

const AddChapterForm = ({ bookId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const methods = useForm();
  const showToast = useToast();
  const onSubmit = async (data) => {
    const formData = {
      chapter_title: data.title,
    };

    try {
      const response = await dispatch(
        addChaptersAsync({ bookId, formData })
      ).unwrap();
      showToast("チャプターが追加されました");
      methods.reset();
      navigate(`/${bookId}/${response._id}`);
    } catch (error) {
      showToast("チャプターの追加に失敗しました");
      console.error("フォームの送信に失敗しました。", error);
    }
  };

  return (
    <div css={RightContent}>
      <h1>チャプターの追加</h1>
      <p css={textStyle}>このページではチャプターを追加することができます。</p>
      <p css={textStyle}>
        下記のフォーム、またはサイドメニューの「+」ボタンよりチャプターを登録してください。
      </p>
      <div css={formContainerStyle}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} css={formStyle}>
            <TextInput
              label="チャプター名"
              placeholder="チャプター名を入力してください。"
              name="title"
              required={true}
              maxLength={16}
            />
            <Button type="submit" color="blue">
              追加する
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default AddChapterForm;
