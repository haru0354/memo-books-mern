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
  max-width: 1140px;
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
      h3: "メモをアプリで全て管理!!",
      text: "メモを本に登録して、複数のメモを一元管理。",
      text2: "様々なメモを簡単に見つけることができます。",
    },
    {
      imageUrl: "/WS000002.JPG",
      imageAlt: "imageAlt",
      h3: "「勉強」「資格」「仕事」のノート替わりに！！",
      text: "「基本情報」「テストに出やすい項目」などチャプター別に管理。",
      text2:
        "目次機能で1タップで必要なメモを即時閲覧可能なので、学習の効率を高めることができます。",
    },
    {
      imageUrl: "/WS000002.JPG",
      imageAlt: "imageAlt",
      h3: "趣味の利用に！！",
      text: "「旅行」の本で「予定候補地」「行きたい観光地」「費用」などチャプター別にメモ。",
      text2:
        "暇な時間にメモを取り合えずしていき、後で「旅行プランの作成」や「行先の決定」。",
    },
    {
      imageUrl: "/WS000002.JPG",
      imageAlt: "imageAlt",
      h3: "ちょっとしたメモに!!",
      text: "特別重要な情報でなくても「後でなんだっけ？」と思うことは結構あります。例えば「興味のあるレストラン」「今すぐ必要でないけどちょっと欲しい物」「気になる本」などなど。",
      text2:
        "簡単にメモの追加や削除が即時できるので、ちょっとしたメモとして使っていくこともできます。",
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
          contentTop="メモブックでは単なるメモ帳アプリとは違い、各チャプター別にメモを登録していくことができます。"
          contentCenter="例えば、「勉強」という本を作れば「数学」「英語」「歴史」とチャプターを作成し、各チャプターごとにメモが可能です。"
          contentBottom="そのため、チャプターに分けて登録することで、「メモした内容がどこにあるか一目で分かり」、「必要な時に一瞬でメモの確認」ができます。"
        />
        <TwoColumnTextImage
          inversion={true}
          title="複数の本を登録が可能"
          contentTop="メモブックでは大きな項目として「本」の登録ができ、そこに「チャプター」があります。"
          contentCenter="複数の本が登録可能なため、「勉強」「プライベート」「欲しい物」「旅行」など、様々な本を登録することができます。"
          contentBottom="複数の本を登録し、各本の中に「チャプター」があり、その中に「メモ」があるので、「様々なメモを全てアプリで管理」し「即時に必要なメモの閲覧」ができます。"
        />
      </section>
      <section css={secondSection}>
        <h2 css={sectionH2Style}>メモブックが使われる理由</h2>
        <div css={reasonArea}>
          <p>メモブックが使われる理由には2つあります。</p>
          <ul>
            <li>「整理による必要なメモを即時閲覧」 </li>
            <li>「管理によりメモを紛失せず綺麗に保管」</li>
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
          title="管理によりメモを紛失せず綺麗に保管"
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
      <section css={firstSection}>
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
      </section>
      <section css={secondSection}>
        <h2 css={sectionH2Style}>こんな人にはおすすめ</h2>
        <TwoColumnTextImage
          title="PCやスマホやノートでメモをする習慣がある人"
          contentTop="英語が話せない人でも安心して海外旅行へをコンセプトに作成されたアプリです。"
          contentCenter="海外だと分からないことも多いです。事前に旅程やメモをして旅行準備さえすれば英語が話せなくても海外旅行ができるようになってます。"
          contentBottom="現地で必要なタイミングでメモを閲覧できるので、言語の壁があっても安心して旅行が可能です。"
        />
        <TwoColumnTextImage
          inversion={true}
          title="勉強中の人"
          contentTop="英語が話せない人でも安心して海外旅行へをコンセプトに作成されたアプリです。"
          contentCenter="海外だと分からないことも多いです。事前に旅程やメモをして旅行準備さえすれば英語が話せなくても海外旅行ができるようになってます。"
          contentBottom="現地で必要なタイミングでメモを閲覧できるので、言語の壁があっても安心して旅行が可能です。"
        />
      </section>
      <section css={firstSection}>
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
