import { css } from "@emotion/react";

const footerStyle = css`
  max-height: 70px;
  font-size: 13px;
  color: #e3e3e3;
  background-color: #5c5c5c;
  text-align: center;
  padding: 1px;


  li {
    margin-bottom: 8px;
  }
`;

const Footer = () => {
  return (
    <footer css={footerStyle}>
      <ul>
        <li>プライバシーポリシー</li>
        <li>
          &copy;無料で本やメモを作成できるブックメモ
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
