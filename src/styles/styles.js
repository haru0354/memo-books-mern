import { css } from "@emotion/react";

// 1カラム時のデザイン
export const main1ColumnStyle = css`
  width: 100%;
  max-width: 1140px;
  min-height: calc(100vh - 229px);
  margin: 0px auto;

  h1 {
    font-size: 30px;
    text-align: center;
    margin-bottom: 80px;
    margin-top: 0;
  }
`;

// 1カラム時のコンテナ
export const oneColumnContainerStyle = css`
  background-color: white;
  margin: 60px 16px;
  padding: 60px 20px;
  border: 1px solid #d7d7d7;
  border-radius: 4px;
`;

// 2カラム時のタグデザイン
export const main2ColumnStyle = css`
  display: flex;
  background-color: #fffaf1;
`;

// 2カラム時のライトカラムレイアウト
export const RightContent = css`
  max-width: 1060px;
  width: 100%;
  min-height: 100vh;
  margin-left: 220px;
  padding-left: 60px;
  padding-right: 20px;
  background-color: #ffffff;

  h1 {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 4rem;
  }

  @media (max-width: 768px) {
    margin: 0;
    padding-left: 0px;
    padding-right: 0px;

  }
`;

// モーダルのスタイル
export const modalBackStyle = css`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(156 163 175 / 65%);
  z-index: 1000;
`;

export const modalContainerStyle = css`
  width: 100%;
  max-width: 450px;
  border-radius: 4px;
  background-color: white;

  h3 {
    font-weight: 600;
    text-align: center;
    padding-bottom: 8px;
    margin-bottom: 40px;
    border-bottom: 1px solid rgb(185 184 184);
  }
`;

// フォームのスタイル
export const formStyle = css`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 20px 20px;
`;

// フォームのエラーメッセージ
export const errorMessageStyle = css`
  color: red;
  text-align: center;
`;

// フォームのボタンエリア
export const buttonContainerStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: 20px;
`;