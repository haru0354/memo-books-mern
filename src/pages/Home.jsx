import Footer from "../components/Footer";
import { css } from "@emotion/react";
import Hero from "../components/section/Hero";

const aSection = css`
  background-color: #ffffff;
`;

const container = css`
  padding: 20px;
  margin: 0px auto;
  max-width: 1100px;
`;

const ctaSection = css`
  padding-top: 40px;
  padding-bottom: 40px;
  padding-right: 0px;
  background-color: #25448b;
`;

const ctaContainer = css`
  padding: 40px;
  margin: 0px auto;
  max-width: 700px;
  border: 1px solid #25448b;
  border-radius: 4px;
  background-color: #fffaf1;
`;

const Home = () => {
  return (
    <>
      <Hero />
      <section>
        <div css={container}>
          <h2>出来ることの紹介(1カラム) </h2>
          <p>aaa</p>
          <p>aaa</p>
          <p>aaa</p>
          <p>aaa</p>
          <p>aaa</p>
          <p>aaa</p>
        </div>
      </section>
      <section css={aSection}>
        <div css={container}>
          <h2>使い道のアイデアを横スクロールで紹介</h2>
          <p>aaa</p>
          <p>aaa</p>
          <p>aaa</p>
          <p>aaa</p>
          <p>aaa</p>
          <p>aaa</p>
          <p>aaa</p>
          <p>aaa</p>
        </div>
      </section>
      <section css={ctaSection}>
        <div css={ctaContainer}>
          <h2>CTAエリア</h2>
          <p>aaa</p>
          <p>aaa</p>
          <p>aaa</p>
          <p>aaa</p>
        </div>
      </section>
      <section>
        <div css={container}>
          <h2>3つの特x徴</h2>
          <p>aaa</p>
          <p>aaa</p>
          <p>aaa</p>
          <p>aaa</p>
          <p>aaa</p>
          <p>aaa</p>
          <p>aaa</p>
          <p>aaa</p>
        </div>
      </section>
      <section css={aSection}>
        <div css={container}>
          <h2>おすすめな人</h2>
          <p>aaa</p>
          <p>aaa</p>
          <p>aaa</p>
          <p>aaa</p>
          <p>aaa</p>
          <p>aaa</p>
          <p>aaa</p>
          <p>aaa</p>
        </div>
      </section>
      <section>
        <div css={container}>
          <h2>よくある質問(開閉式にする)</h2>
          <p>aaa</p>
          <p>aaa</p>
          <p>aaa</p>
          <p>aaa</p>
          <p>aaa</p>
          <p>aaa</p>
          <p>aaa</p>
          <p>aaa</p>
        </div>
      </section>
      <section css={ctaSection}>
        <div css={ctaContainer}>
          <h2>CTAエリア</h2>
          <p>aaa</p>
          <p>aaa</p>
          <p>aaa</p>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
