import { css } from "@emotion/react";
import SignUp from "../../auth/SignUp";
import AnimationItem from "../../lib/AnimationItem";

const heroSection = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #99bff7;
`;

const heroContainer = css`
  display: flex;
  align-items: center;
  justify-content: space-around;
  max-width: 1140px;
  width: 100%;
  padding: 40px 10px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const hero = css`
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
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
