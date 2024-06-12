import Footer from "../components/Footer";
import { css } from "@emotion/react";
import Button from "../components/ui/Button";

const heroSection = css`
  background-color: #99bff7;
`;

const heroContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding-top: 70px;
  padding-bottom: 70px;
  padding-right: 20px;
  padding-left: 20px;
  margin: 0px auto;
  max-width: 1100px;
  width: 100%;
`;

const hero = css`
  padding: 40px;
  max-width: 400px;
  width: 100%;
  border-radius: 4px;
`;

const heroForm = css`
  margin-left: auto;
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 20px;
  max-width: 250px;
  width: 100%;
  background-color: white;
  border-radius: 4px;
`;

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
      <section css={heroSection}>
        <div css={heroContainer}>
          <div css={hero}>
            <h2>出来ることの紹介(1カラム) </h2>
            <p>aaa</p>
            <p>aaa</p>
            <p>aaa</p>
            <p>aaa</p>
          </div>
          <div css={heroForm}>
            <p>フォーム</p>
            <label htmlFor="">ニックネーム</label>
            <input type="text" />
            <label htmlFor="">メールアドレス</label>
            <input type="text" />
            <label htmlFor="">パスワード</label>
            <input type="text" />
            <Button color="blue">登録</Button>
            <Button color="gray">googleでログイン</Button>
          </div>
        </div>
      </section>
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
