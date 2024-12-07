import { css } from "@emotion/react";
import { Link } from "react-router-dom";

const footerStyle = css`
  font-size: 13px;
  color: #e3e3e3;
  background-color: #5c5c5c;
  text-align: center;
  padding: 1px;
`;

const LinkLiStyle = css`
  color: #e3e3e3;
`;

const Footer = () => {
  return (
    <footer css={footerStyle}>
      <ul>
        <li>
          <Link to="/privacypolicy" css={LinkLiStyle}>プライバシーポリシー</Link>
        </li>
        <li>&copy;無料で本やメモを作成できるブックメモ</li>aaaa
      </ul>
    </footer>
  );
};

export default Footer;
