import { css } from "@emotion/react";

// 1カラム時のmainタグデザイン
export const main1ColumnStyle = css`
  width: 100%;
  max-width: 1110px;
  margin: 0px auto;
  padding: 0 15px;

  h1 {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 2rem;
    margin-top: 0;
  }

  h2 {
    word-wrap: break-word;
    padding-top: 2rem;
    padding-left: 1.7rem;
    font-size: 1.2rem;
  }
`;

// 2カラム時のmainタグデザイン
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
  z-index: 50;
`;

export const modalContainerStyle = css`
  max-width: 450px;
  padding-top: 0.8rem;
  padding-left: 2rem;
  padding-bottom: 2rem;
  padding-right: 2rem;
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
`;

// フォームのエラーメッセージ
export const errorMessageStyle = css`
  color: red;
  text-align: center;
`;
