import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import { memo } from "react";

const headerContainer = css`
  width: 100%;
  height: 75px;
  background-color: white;

  a {
    color: #374151;
  }
`;

const oneColumnAddHeaderContainer = css`
  border-bottom: 1px solid rgb(215 215 215);
`;

const headerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const oneColumnAddHeaderStyle = css`
  max-width: 1110px;
  margin: 0 auto;
  padding: 0 15px;
  color: rgb(55 65 81);
`;

const twoColumnAddHeaderStyle = css`
  position: fixed;
  width: 100%;
  max-width: 1300px;
  padding-left: 1rem;
  padding-right: 2rem;
  color: #ffffe9;
  background-color: #5c5c5c;

  a {
    color: #e3e3e3;
  }
`;

const menuStyle = css`
  display: flex;

  li {
    margin: 0 1rem;
    padding: 0.2rem 1rem;

    &:hover {
      background-color: #e3e3e3;
      color: #374151;
    }
  }
`;

const Header = ({ variant }) => {
  return (
    <header
      css={[
        headerContainer,
        variant === "oneColumn" && oneColumnAddHeaderContainer,
      ]}
    >
      <div
        css={[
          headerStyle,
          variant === "oneColumn" && oneColumnAddHeaderStyle,
          variant === "twoColumn" && twoColumnAddHeaderStyle,
        ]}
      >
        <Link to="/">
          <h2>メモブック</h2>
        </Link>
        <ul css={menuStyle}>
          <Link to="/books">
            <li>ログイン</li>
          </Link>
          <Link to="/">
            <li>登録</li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default memo(Header);
