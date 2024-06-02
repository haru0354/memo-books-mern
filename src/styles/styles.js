import { css } from "@emotion/react";

export const main2ColumnStyle = css`
  display: flex;
  flex: 1;
`;

export const RightContent = css`
  flex: 1;
  max-width: 1000px;
  margin-left: 80px;
  padding: 20px;
  background-color: #ffffff;

  h1 {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 2rem;
  }
`;
export const modalBackStyle = css`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(156 163 175 / 65%);
`;

export const modalContainerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 450px;
  padding: 2rem;
  border-radius: 4px;
  background-color: white;
  margin: 0 auto;
`;
