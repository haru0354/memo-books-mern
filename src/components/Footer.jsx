import { css } from "@emotion/react";

const footerStyle = css`
  background-color: rgb(245 160 111);;
  padding: 2px;
  text-align: center;
  `;

const Footer = () => {
  return (
    <footer css={footerStyle}>
      <ul>
        <li>プライバシーポリシー</li>
        <li>
          &copy;英語なしで最高の海外旅行の思い出を作る「トラベルメモリー」
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
