import { css } from "@emotion/react";

const footerStyle = css`
  max-height: 70px;
  font-size: 13px;
  background-color: rgb(207 207 207);
  text-align: center;

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
