import { Helmet } from "react-helmet-async";
import { css } from "@emotion/react";
import { main1ColumnStyle, oneColumnContainerStyle } from "../styles/styles";
import DeleteUser from "../auth/deleteAccount/DeleteUser";
import ChangePassword from "../auth/ChangePassword";

const h2Style = css`
  font-size: 20px;
  border-bottom: 2px solid rgb(55 65 81);
  padding-left: 15px;
  padding-bottom: 8px;
`;

const Setting = () => {
  return (
    <>
      <Helmet>
        <title>アカウントの設定 | メモブックノート</title>
        <meta
          name="description"
          content="本にフォルダ分けし、メモを保存できる無料のwebアプリ。PC・スマホ・android・iphone対応で機種変更もそのままで利用。シンプルで使い方が簡単なアプリです。ビジネス(仕事や創作)・生活費(光熱費・交通費)・勉強・タスク管理と利用方法は様々。"
        />
        <meta name="robots" content="noindex" />
      </Helmet>
      <div css={main1ColumnStyle}>
        <div css={oneColumnContainerStyle}>
          <h1>アカウントの設定</h1>
          <h2 css={h2Style}>アカウントの削除</h2>
          <p>こちらからアカウントの削除を行うことができます。</p>
          <p>削除を行うと復元をすることはできなくなります。</p>
          <p>
            再度アカウントを作成することは可能ですが、今までに作成したデータを戻すことはできません。
          </p>
          <p>問題がなければ下記よりアカウントの削除を行うことができます。</p>
          <DeleteUser />
          <h2 css={h2Style}>パスワードの変更</h2>
          <p>こちらからパスワードの変更を行うことができます。</p>
          <p>
            「推測されにくい文字列・定期的なパスワードの変更・使いまわしをしない」これらのことはアカウントのセキュリティを向上させます。
          </p>
          <ChangePassword />
        </div>
      </div>
    </>
  );
};

export default Setting;
