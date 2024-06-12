import { css } from "@emotion/react";
import { main1ColumnStyle, oneColumnContainerStyle } from "../styles/styles";
import DeleteUser from "../auth/deleteAccount/DeleteUser";

const h2Style = css`
  font-size: 20px;
  border-bottom: 2px solid rgb(55 65 81);
  padding-left: 15px;
  padding-bottom: 8px;
`;



const Setting = () => {
  return (
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
      </div>
    </div>
  );
};

export default Setting;
