import { css } from "@emotion/react";
import SignUp from "../../auth/SignUp";
import AnimationItem from "../../lib/AnimationItem";

const heroSection = css`
  background-color: #99bff7;
`;

const heroContainer = css`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  max-width: 1140px;
  width: 100%;
  margin: 0px auto;
  padding: 40px 0;
  text-align: center;
`;

const hero = css`
  max-width: 360px;
  width: 100%;
  padding: 40px;
  border-radius: 4px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    padding-top: 0px;
  }
`;

const Hero = () => {
  return (
    <section css={heroSection}>
      <div css={heroContainer}>
        <AnimationItem elType="div" animation="fadeInDown" emotionCss={hero}>
          <h2>様々なメモを簡単に管理</h2>
          <p>本のようにチャプターに分け目的別にメモを管理!</p>
          <p>見たいメモを一瞬で確認ができる。</p>
          <p>20秒で登録して即使える</p>
          <p>PC・スマホ・タブレット対応の無料アプリ</p>
        </AnimationItem>
        <SignUp />
      </div>
    </section>
  );
};

export default Hero;
