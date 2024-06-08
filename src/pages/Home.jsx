import { Helmet } from "react-helmet-async";
import { css } from "@emotion/react";
import Hero from "../components/section/Hero";
import TwoColumnTextImage from "../components/section/TwoColumnTextImage";
import ImageSlider from "../components/slider/ImageSlider";
import CtaSection from "../components/section/CtaSection";
import ThreePoint from "../components/section/ThreePoint";
import QaSection from "../components/section/QaSection";
import Footer from "../components/Footer";

const firstSection = css`
  padding: 60px 10px;
`;

const secondSection = css`
  padding: 60px 10px;
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

const reasonArea = css`
  margin: 0 auto;
  text-align: center;
  width: 100%;
  max-width: 650px;
  border: 1px solid rgb(215 215 215);
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
      <Helmet>
        <title>メモブック「本のようにチャプターに分けてメモを保存」</title>
        <meta
          name="description"
          content="メモブックでは本のようにチャプターに分けてメモを保存して整理をする無料のwebアプリです。どの端末からでもメモの保存や確認などすることができます。勉強での学習のメモや仕事の管理や欲しい物リストの管理など、あらゆるメモを登録できます。PC・スマホ・タブレットでの利用が可能。"
        ></meta>
      </Helmet>
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
        <h2 css={sectionH2Style}>メモブックが使われる理由</h2>
        <div css={reasonArea}>
          <p>メモブックが使われる理由には2つあります。</p>
          <ul>
            <li>「整理による必要なメモを即時閲覧」 </li>
            <li>「管理により綺麗な状態で保管」</li>
          </ul>
          <p>
            なぜ、そんなことで使われるのか、どんなメリットを得られるか紹介していきます。
          </p>
        </div>
        <TwoColumnTextImage
          title="整理による必要なメモを即時閲覧"
          contentTop="PCやスマホや紙のノートで、「メモを取ったファイルやノートを探し」、更に「閲覧したい部分をめくって探す」のは、面倒ではありませんか？」"
          contentCenter="メモブックでは「本」や「チャプター」に項目を作成することで、「どの本に何が書かれていて」、「各チャプターにどんなメモが書かれているか」簡単にメモを整理できます。"
          contentBottom="また、「作成したメモは自動で目次が作成」されるので、本を開き必要な目次をクリックで、「探してるメモを即時閲覧」できます。"
        />
        <TwoColumnTextImage
          title="管理により綺麗な状態で保管"
          contentTop="「PCやスマホでメモを取ったがどこか分からない・・・」「ノートにメモを取ったが無くした、ボロボロになってしまった・・・」こんな経験はありませんか？"
          contentCenter="メモブックでは「メモをこのアプリの中で全て管理」できるので、どこにファイルやノートがあるか探す必要はなくなります。"
          contentBottom="また、「ノートのように紛失したり」「ボロボロになってしまう」心配がなく、インターネット環境さえあればアプリにアクセスし、閲覧をすることができます。"
        />
      </section>
      <section css={firstSection}>
        <h2 css={sectionH2Style}>メモブックの使い方の例</h2>
        <ImageSlider items={sliderItems} />
      </section>
      <CtaSection
        title="30秒で登録して無料で使える"
        topText="メモブックは「ニックネーム」「emailアドレス」「パスワード」の3つを入力するだけなので、操作に慣れた人なら「30秒ほどでアカウントが作成」されます。"
        centerText="アカウント作成も利用も「完全無料」なので、費用は一切かからないアプリです。"
        bottomText="まずは下記ボタンよりアカウントを作成し試してみてください。"
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
            text="メモブックは完全無料のアプリです。利用料金は一切かかりません。"
          />
          <QaSection
            title="「iphone」や「android」のスマホで利用できますか？"
            text="「iphone」や「android」のどちらでも利用が可能です。PC・タブレット・スマートフォンのあらゆる端末で利用ができます。"
          />
          <QaSection
            title="PCで作成してスマホでの閲覧はできますか？(逆のパターンも含む)"
            text="同じアカウントでログインすれば、作成したメモはどの端末でも確認できます。PCやスマホやタブレットでメモの作成と閲覧ができます。"
          />
          <QaSection
            title="利用するのに必要なのは何ですか？"
            text="利用するのに必要なのは、「アカウント」と「端末(PC・スマホ・タブレット)」と「インターネットへのアクセス環境」の3つです。アカウントは「ニックネーム」「email」「パスワード」の3つのみで作成が可能です。"
          />
        </div>
      </section>
      <CtaSection
        title="「メモブック」を無料で即時利用"
        topText="メモブックは「完全無料で利用できるwebアプリ」です。"
        centerText="PC・スマホ・タブレットの、androidやiphoneなどの、どの端末でもインターネットに接続できれば利用が可能となっています。"
        bottomText="登録は「ニックネーム」「emailアドレス」「パスワード」の3つを入力しアカウントを作成すれば、利用ができます。"
        buttonText="登録して利用"
      />
      <Footer />
    </>
  );
};

export default Home;
