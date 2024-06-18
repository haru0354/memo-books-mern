import { css } from "@emotion/react";
import SignUp from "../../auth/SignUp";

const heroSection = css`
  background-color: #99bff7;
`;

const heroContainer = css`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 40px 0;
  margin: 0px auto;
  max-width: 1140px;
  width: 100%;
`;

const hero = css`
  padding: 40px;
  max-width: 360px;
  width: 100%;
  border-radius: 4px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: auto;
`;

const formContainerStyle = css`
  width: 100%;
  max-width: 300px;
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
        <SignUp />
      </div>
    </section>
  );
};

export default Hero;
