import { css } from "@emotion/react";
import Button from "../ui/Button";
import { FormProvider, useForm } from "react-hook-form";
import { formStyle } from "../../styles/styles";
import TextInput from "../ui/TextInput";

const heroSection = css`
  background-color: #99bff7;
`;

const heroContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 60px 20px;
  margin: 0px auto;
  max-width: 1100px;
  width: 100%;
`;

const hero = css`
  padding: 40px;
  max-width: 360px;
  width: 100%;
  border-radius: 4px;
  margin-bottom: auto;
`;

const formContainerStyle = css`
  width: 100%;
  max-width: 300px;
  padding: 20px;
  background-color: white;
  border-radius: 4px;
`;

const textCenterStyle = css`
  text-align: center;
`;

const FormTextStyle = css`
  text-align: center;
  margin-bottom: 1rem;
  padding-bottom: 4px;
  border-bottom: 1px dashed gray;
  font-weight: 600;
`;

const errorMessageStyle = css`
  font-size: 0.8rem;
  color: red;
  margin-bottom: 5px;
`;

const Hero = () => {
  const methods = useForm();

  const onSubmit = () => {};

  return (
    <section css={heroSection}>
      <div css={heroContainer}>
        <div css={hero}>
          <h2 css={textCenterStyle}>様々なメモを簡単に管理</h2>
          <p css={textCenterStyle}>
            本のようにチャプターに分け目的別にメモを管理!
          </p>
          <p css={textCenterStyle}>見たいメモを一瞬で確認ができる</p>
          <p css={textCenterStyle}>20秒で登録して即使える</p>
          <p css={textCenterStyle}>PC・スマホ・タブレット対応の無料アプリ</p>
        </div>
        <div css={formContainerStyle}>
          <FormProvider {...methods}>
            <form css={formStyle} onSubmit={methods.handleSubmit(onSubmit)}>
              <span css={FormTextStyle}>アカウント登録</span>
              <TextInput
                label="ニックネーム(英数字)"
                placeholder="英数字で入力してください"
                name="name"
                required={true}
                maxLength={10}
              />
              {methods.formState.errors.name && (
                <span css={errorMessageStyle}>
                  {methods.formState.errors.name.message}
                </span>
              )}
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
              />
              
              
              {methods.formState.errors.password && (
                <span css={errorMessageStyle}>
                  {methods.formState.errors.password.message}
                </span>
              )}
              <div css={textCenterStyle}>
                <Button type="submit" color="blue">
                  登録
                </Button>
                <Button color="gray">googleでログイン</Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </section>
  );
};

export default Hero;
