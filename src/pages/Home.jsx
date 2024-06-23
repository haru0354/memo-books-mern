import { Helmet } from "react-helmet-async";
import { css } from "@emotion/react";
import Hero from "../components/section/Hero";
import TwoColumnTextImage from "../components/section/TwoColumnTextImage";
import ImageSlider from "../components/slider/ImageSlider";
import CtaSection from "../components/section/CtaSection";
import ThreePoint from "../components/section/ThreePoint";
import QaSection from "../components/section/QaSection";
import AnimationItem from "../lib/AnimationItem";

const firstSection = css`
  padding-top: 60px;
  padding-right: 10px;
  padding-bottom: 30px;
  padding-left: 10px;
  overflow-x: hidden;
`;

const secondSection = css`
  padding-top: 60px;
  padding-right: 10px;
  padding-bottom: 30px;
  padding-left: 10px;
  background-color: #e4f1ff;
  overflow-x: hidden;
`;

const qaContainer = css`
  width: 100%;
  max-width: 1140px;
  margin: 0px auto;
`;

const sectionH2Style = css`
  text-align: center;
  margin-top: 0rem;
  margin-bottom: 2rem;
  font-size: 1.8rem;
  font-weight: 600;
`;

const reasonArea = css`
  width: 100%;
  max-width: 650px;
  margin: 0 auto;
  padding: 2px;
  text-align: center;
  border: 1px dashed gray;
  border-radius: 4px;
`;

const Home = () => {
  const sliderItems = [
    {
      imageUrl: "/convert_webp/memo-book-note-list.webp",
      imageAlt: "メモリストのアプリ",
      h3: "メモをアプリで全て管理!!",
      text: "メモを本に登録して、複数のメモを一元管理。",
      text2: "様々なメモを簡単に見つけることができます。",
    },
    {
      imageUrl: "/convert_webp/study-memo.webp",
      imageAlt: "勉強関係のメモ",
      h3: "「勉強」「資格」「仕事」のノート替わりに！！",
      text: "「基本情報」「テストに出やすい項目」などチャプター別に管理。",
      text2:
        "目次機能で1タップで必要なメモを即時閲覧可能なので、学習の効率を高めることができます。",
    },
    {
      imageUrl: "/convert_webp/trip-memobook.webp",
      imageAlt: "趣味の海外旅行のメモ",
      h3: "趣味の利用に！！",
      text: "「旅行」の本で「予定候補地」「行きたい観光地」「費用」などチャプター別にメモ。",
      text2:
        "暇な時間にメモを取り合えずしていき、後で「旅行プランの作成」や「行先の決定」。",
    },
    {
      imageUrl: "/convert_webp/memo-private.webp",
      imageAlt: "プライベートな欲しいものリスト",
      h3: "ちょっとしたメモに!!",
      text: "「後でなんだっけ？」と思うことは結構あります。例えば「興味のあるレストラン」「今すぐ必要でないけどちょっと欲しい物」「気になる本」などなど。",
      text2:
        "簡単にメモの追加や削除が即時できるので、ちょっとしたメモとして使っていくこともできます。",
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          フォルダを分けメモする無料のPC・スマホアプリ「メモブックノート」
        </title>
        <meta
          name="description"
          content="本にフォルダ分けし、メモを保存できる無料のwebアプリ。PC・スマホ・android・iphone対応で機種変更もそのままで利用。シンプルで使い方が簡単なアプリです。ビジネス(仕事や創作)・生活費(光熱費・交通費)・勉強・タスク管理と利用方法は様々。"
        ></meta>
      </Helmet>
      <Hero />
      <section css={firstSection}>
        <h2 css={sectionH2Style}>メモブックの機能</h2>
        <TwoColumnTextImage
          animationStyle="fadeInRight"
          title="様々なメモをチャプター別に登録が可能"
          contentTop="メモブックでは単なるメモ帳アプリとは違い、各チャプター別にメモを登録していくことができます。"
          contentCenter="例えば、「勉強」という本を作れば「数学」「英語」「歴史」とチャプターを作成し、各チャプターごとにメモが可能です。"
          contentBottom="そのため、チャプターに分けて登録することで、「メモした内容がどこにあるか一目で分かり」、「必要な時に一瞬でメモの確認」ができます。"
          imgSrc="/convert_webp/memo-book-note-chapter.webp"
          imgAlt="メモブックノートのチャプター機能"
        />
        <TwoColumnTextImage
          animationStyle="fadeInLeft"
          inversion={true}
          title="複数の本を登録が可能"
          contentTop="メモブックでは大きな項目として「本」の登録ができ、そこに「チャプター」があります。"
          contentCenter="複数の本が登録可能なため、「勉強」「プライベート」「欲しい物」「旅行」など、様々な本を登録することができます。"
          contentBottom="複数の本を登録し、各本の中に「チャプター」があり、その中に「メモ」があるので、「様々なメモを全てアプリで管理」し「即時に必要なメモの閲覧」ができます。"
          imgSrc="/convert_webp/memo-book-note-list.webp"
          imgAlt="作成したメモブックノート"
        />
      </section>
      <section css={secondSection}>
        <h2 css={sectionH2Style}>メモブックが使われる理由</h2>
        <AnimationItem
          emotionCss={reasonArea}
          elType="div"
          animation="fadeInDown"
        >
          <p>メモブックが使われる理由には2つあります。</p>
          <ul>
            <li>「整理による必要なメモを即時閲覧」 </li>
            <li>「管理によりメモを紛失せず綺麗に保管」</li>
          </ul>
          <p>
            なぜ、そんなことで使われるのか、どんなメリットを得られるか紹介していきます。
          </p>
        </AnimationItem>
        <TwoColumnTextImage
          animationStyle="fadeInRight"
          title="整理による必要なメモを即時閲覧"
          contentTop="PCやスマホや紙のノートで、「メモを取ったファイルやノートを探し」、更に「閲覧したい部分をめくって探す」のは、面倒ではありませんか？」"
          contentCenter="メモブックでは「本」や「チャプター」に項目を作成することで、「どの本に何が書かれていて」、「各チャプターにどんなメモが書かれているか」簡単にメモを整理できます。"
          contentBottom="また、「作成したメモは自動で目次が作成」されるので、本を開き必要な目次をクリックで、「探してるメモを即時閲覧」できます。"
          imgSrc="/convert_webp/memo-book-view.webp"
          imgAlt="メモブックノートの目次機能"
        />
        <TwoColumnTextImage
          animationStyle="fadeInLeft"
          title="管理によりメモを紛失せず綺麗に保管"
          contentTop="「PCやスマホでメモを取ったがどこか分からない・・・」「ノートにメモを取ったが無くした、ボロボロになってしまった・・・」こんな経験はありませんか？"
          contentCenter="メモブックでは「メモをこのアプリの中で全て管理」できるので、どこにファイルやノートがあるか探す必要はなくなります。"
          contentBottom="また、「ノートのように紛失したり」「ボロボロになってしまう」心配がなく、インターネット環境さえあればアプリにアクセスし、閲覧をすることができます。"
          imgSrc="/convert_webp/memo-storage.webp"
          imgAlt="メモを忘れても思い出せるアプリ"
        />
      </section>
      <section css={firstSection}>
        <h2 css={sectionH2Style}>メモブックの使い方の例</h2>
        <ImageSlider items={sliderItems} />
      </section>
      <CtaSection
        title="20秒で登録して無料で使える"
        topText="メモブックは「emailアドレス」「パスワード」の2つを入力するだけなので、操作に慣れた人なら「20秒ほどでアカウントが作成」されます。"
        centerText="アカウント作成も利用も「完全無料」なので、費用は一切かからないアプリです。"
        bottomText="まずは下記ボタンよりアカウントを作成し試してみてください。"
        buttonText="今すぐ試してみる"
      />
      <section css={firstSection}>
        <h2 css={sectionH2Style}>3つの特x徴</h2>
        <ThreePoint
          firstTitle="メモの登録が簡単"
          firstText="メモブックには面倒な設定などは一切必要なし。すぐに、メモの「作成・閲覧・編集・削除」ができます"
          firstTextSecond="本の登録、チャプターの登録、メモの登録と、各ページでボタンひとつで登録をすることができます。"
          secondTitle="目次で簡単にメモの閲覧"
          secondText="チャプターページにてメモを作成すると、そのページの上部には自動で目次が作成されます。"
          secondTextSecond="メモを見る時は上部の目次をクリックすれば、即時に該当のメモの閲覧が可能なので、どの辺りにあるか探す必要はありません。"
          thirdTitle="端末を選ばず利用可能"
          thirdText="PC・スマホ・タブレットで利用ができます。必要なのは「端末」「インターネットに接続する環境」「アカウント」です。"
          thirdTextSecond="「PCで作成してスマホで閲覧」。「スマートフォンで作成してPCで閲覧」することも可能です。"
        />
      </section>
      <section css={secondSection}>
        <h2 css={sectionH2Style}>こんな人にはおすすめ</h2>
        <TwoColumnTextImage
          animationStyle="fadeInRight"
          title="PCやスマホでメモをする習慣がある人"
          contentTop="メモブックを使うことで、「全てのメモの管理」がしやすく、「見たい項目がどこにあるか一目で分かります」。"
          contentCenter="メモを取っても保存したのかを忘れることもあります。また、メモが多いとその時に必要だと思っても、後程忘れてしまって、どんなことを記載したか見たいこともあります。"
          contentBottom="ひとつの項目で「本」を作り「チャプター」分けることで、どこに見たい項目があるのか一目で分かり、かつどこに保存したのかや紛失して見れなくなる心配がありません。"
          imgSrc="/convert_webp/pc-memo.webp"
          imgAlt="メモブックノートのチャプター機能"
        />
        <TwoColumnTextImage
          animationStyle="fadeInLeft"
          inversion={true}
          title="勉強中の学生や資格取得の社会人"
          contentTop="学校や資格の勉強となると「頻繁にメモした内容を確認」することも多いです。"
          contentCenter="メモブックでは目次機能によって、即座にメモを閲覧でき、パソコンやスマホをスクロールしたり、ノートをめくったりして「探す無駄な時間を省けます」。"
          contentBottom="チャプターで情報を整理して目次の確認で、勉強中に「あれ何だっけ？」と思っても、即座に確認できます。"
          imgSrc="/convert_webp/study-memo-book-note.webp"
          imgAlt="資格の勉強中のメモするノート"
        />
        <TwoColumnTextImage
          animationStyle="fadeInRight"
          title="インターネットの閲覧をする人"
          contentTop="PCやスマホでよくネットサーフィンをして、「趣味について調べたり」「今日の献立を考えたり」とちょっとした情報を調べる人におすすめです。"
          contentCenter="簡単に登録と閲覧ができるようになっているので、ちょっとした内容をメモして、あとで確認するのに適しています。"
          contentBottom="とりあえず興味の出た「レストラン」「旅行先」や「買い物時に購入予定の物」「趣味の情報」などをぱっとメモをして、必要な後で確認や削除がぱっとできます。"
          imgSrc="convert_webp/internet-memo.webp"
          imgAlt="パソコンでメモする女性"
        />
      </section>
      <section css={firstSection}>
        <h2 css={sectionH2Style}>よくある質問(クリックで開閉)</h2>
        <AnimationItem
          elType="div"
          animation="fadeInDown"
          emotionCss={qaContainer}
        >
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
            text="利用するのに必要なのは、「アカウント」と「端末(PC・スマホ・タブレット)」と「インターネットへのアクセス環境」の3つです。アカウントは「email」「パスワード」の2つのみで作成が可能です。"
          />
          <QaSection
            title="目次機能とは？"
            text="メモした内容は自動で目次に追加されます。目次のメモ名をクリックやタップすると、メモのある位置までスクロールします。メモが増えるとスクロールして探したりと大変なことも多いです。即時に見たい項目が確認ができるようになっています。"
          />
        </AnimationItem>
      </section>
      <CtaSection
        title="「メモブック」を無料で即時利用"
        topText="メモブックは「完全無料で利用できるwebアプリ」です。"
        centerText="「PC・スマホ・タブレット」の、「android・iphone」などの、どの端末でもインターネットに接続できれば利用が可能となっています。"
        bottomText="登録は「emailアドレス」「パスワード」の2つを入力しアカウントを作成すれば、利用ができます。"
        buttonText="登録して利用"
      />
    </>
  );
};

export default Home;
