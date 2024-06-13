import Footer from "../components/Footer";
import { css } from "@emotion/react";
import Hero from "../components/section/Hero";
import TwoColumnTextImage from "../components/section/TwoColumnTextImage";
import ImageSlider from "../components/slider/ImageSlider";
import CtaSection from "../components/section/CtaSection";
import ThreePoint from "../components/section/ThreePoint";
import QaSection from "../components/section/QaSection";

const firstSection = css`
  padding-top: 4rem;
  padding-bottom: 4rem;
`;

const secondSection = css`
  padding-top: 4rem;
  padding-bottom: 4rem;
  background-color: #e4f1ff;
`;

const container = css`
  padding: 20px;
  margin: 0px auto;
  max-width: 1100px;
`;

const sectionH2Style = css`
  text-align: center;
  margin-top: 0rem;
  margin-bottom: 2rem;
  font-size: 1.8rem;
  font-weight: 600;
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
      <CtaSection
        title="a"
        topText="top"
        centerText="center"
        bottomText="bottom"
        buttonText="今すぐ試してみる"
      />
      <section>
        <div css={firstSection}>
          <h2 css={sectionH2Style}>3つの特x徴</h2>
          <ThreePoint
            firstTitle="いいいいいいいいい"
            firstText="ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ"
            firstTextSecond="あああああああああああああああああああああああああああああああああああああああああああああああああああ"
            secondTitle="ううううううう"
            secondText="ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ"
            secondTextSecond="あああああああああああああああああああああああああああああああああああああああああああああああああああ"
            thirdTitle="ええええええ"
            thirdText="ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ"
            thirdTextSecond="あああああああああああああああああああああああああああああああああああああああああああああああああああ"
          />
        </div>
      </section>
      <section css={secondSection}>
        <div css={container}>
          <h2 css={sectionH2Style}>こんな人にはおすすめ</h2>
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
        </div>
      </section>
      <section css={firstSection}>
        <div css={container}>
          <h2 css={sectionH2Style}>よくある質問(クリックで開閉)</h2>
          <QaSection
            title="本当に無料で利用できますか？"
            text="完全無料のアプリです。"
          />
          <QaSection
            title="本当に無料で利用できますか？"
            text="完全無料のアプリです。"
          />
        </div>
      </section>
      <CtaSection
        title="a"
        topText="top"
        centerText="center"
        bottomText="bottom"
        buttonText="登録して利用"
      />
      <Footer />
    </>
  );
};

export default Home;
