import { Helmet } from "react-helmet-async";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { main1ColumnStyle, oneColumnContainerStyle } from "../styles/styles";

const addTextCenterStyle = css`
  text-align: center;
`;

const returnStyle = css`
  margin-top: 3rem;
  font-size: 1.2rem;
`;

const Page404 = () => {
  return (
    <>
      <Helmet>
        <title>ページが見つかりませんでした | メモブックノート</title>
        <meta
          name="description"
          content="メモブックの404ページです。このページは存在しないか削除された可能性があります。"
        />
        <meta name="robots" content="noindex" />
      </Helmet>
      <Header variant="oneColumn" />
      <div css={main1ColumnStyle}>
        <div css={[oneColumnContainerStyle, addTextCenterStyle]}>
          <h2>ページが見つかりませんでした</h2>
          <p>このページは存在しないか削除された可能性があります。</p>
          <p>URLが正しいかご確認ください。</p>
          <p css={returnStyle}>
            <Link to="/">TOPページへ戻る</Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page404;
