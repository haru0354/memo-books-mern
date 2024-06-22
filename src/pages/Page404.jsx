import { Helmet } from "react-helmet-async";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";

const page404Style = css`
  text-align: center;
  margin: auto;
`;

const returnStyle = css`
  margin-top: 3rem;
  font-size: 1.2rem;
`;

const Page404 = () => {
  return (
    <>
      <Helmet>
        <title>404NotFound | メモブックノート</title>
        <meta
          name="description"
          content="メモブックの404ページです。このページは存在しないか削除された可能性があります。"
        />
        <meta name="robots" content="noindex" />
      </Helmet>
      <div css={page404Style}>
        <h2>404 Not Found</h2>
        <p>このページは存在しないか削除されました。</p>
        <p>URLが正しいかご確認ください。</p>
        <p css={returnStyle}>
          <Link to="/">TOPページへ戻る</Link>
        </p>
      </div>
    </>
  );
};

export default Page404;
