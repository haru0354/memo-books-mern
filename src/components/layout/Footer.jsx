import { css } from "@emotion/react";
import { Link } from "react-router-dom";

const footerStyle = css`
  font-size: 13px;
  color: #e3e3e3;
  background-color: #5c5c5c;
  text-align: center;
`;

const ulStyle = css`
  margin: 0px;
  padding: 10px;
  @media (max-width: 768px) {
    margin: 0px;
  }
`;

const LinkLiStyle = css`
  color: #e3e3e3;
`;

const Footer = () => {
  return (
    <footer css={footerStyle}>
      <ul css={ulStyle}>
        <li>
          <Link to="/privacypolicy" css={LinkLiStyle}>
            プライバシーポリシー
          </Link>
        </li>
        <li>&copy;無料で本やメモを作成できるブックメモ</li>
      </ul>
    </footer>
  );
};

export default Footer;
