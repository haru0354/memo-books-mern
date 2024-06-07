import Footer from "../components/Footer";
import { css } from "@emotion/react";
import Hero from "../components/section/Hero";
import TwoColumnTextImage from "../components/section/TwoColumnTextImage";
import { sectionH2Style } from "../styles/styles";
import ImageSlider from "../components/slider/ImageSlider";

const firstSection = css`
  padding-top: 4rem;
  padding-bottom: 4rem;
  `;

const secondSection = css`
  padding-top: 4rem;
  padding-bottom: 4rem;
  background-color: #99bff7;
`;

const container = css`
  padding: 20px;
  margin: 0px auto;
  max-width: 1100px;
`;

const ctaSection = css`
  padding-top: 60px;
  padding-bottom: 60px;
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
  const sliderItems = [
    {
      imageUrl: "/WS000002.JPG",
      imageAlt: "imageAlt",
      text: "勉強に利用するノート替わりに!",
      text2: "勉強に利用するノート替わりに!",
      h3: "3勉強に利用するノート替わりに!3",
    },
    {
      imageUrl: "/WS000002.JPG",
      imageAlt: "imageAlt",
      text: "あああああああああああああああああ",
      text2: "ああああああああああああああああ",
      h3: "ああああああああああああああああ",
    },
    {
      imageUrl: "/WS000002.JPG",
      imageAlt: "imageAlt",
      text: "いいいいいいいいいいいいいいいいいい",
      text2: "いいいいいいいいいいいいいいいいいい",
      h3: "いいいいいいいいいいいいいいいいいい",
    },
  ];

  return (
    <>
      <Hero />
      <section css={firstSection}>
        <h2 css={sectionH2Style}>メモブックの機能</h2>
        <TwoColumnTextImage
          title="様々なメモをチャプター別に登録が可能"
          contentTop="英語が話せない人でも安心して海外旅行へをコンセプトに作成されたアプリです。"
          contentCenter="海外だと分からないことも多いです。事前に旅程やメモをして旅行準備さえすれば英語が話せなくても海外旅行ができるようになってます。"
          contentBottom="現地で必要なタイミングでメモを閲覧できるので、言語の壁があっても安心して旅行が可能です。"
        />
        <TwoColumnTextImage
          inversion={true}
          title="複数の本を登録が可能"
          contentTop="英語が話せない人でも安心して海外旅行へをコンセプトに作成されたアプリです。"
          contentCenter="海外だと分からないことも多いです。事前に旅程やメモをして旅行準備さえすれば英語が話せなくても海外旅行ができるようになってます。"
          contentBottom="現地で必要なタイミングでメモを閲覧できるので、言語の壁があっても安心して旅行が可能です。"
        />
      </section>
      <section css={secondSection}>
        <h2 css={sectionH2Style}>メモブックの使い方の例</h2>
        <ImageSlider items={sliderItems} />
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
      <section css={secondSection}>
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
