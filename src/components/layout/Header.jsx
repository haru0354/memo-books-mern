import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import { memo } from "react";
import LoginModal from "../../auth/LoginModal"

const headerContainer = css`
  width: 100%;
  height: 75px;
  background-color: #fffdfb;

  a {
    color: #374151;
  }

  @media (max-width: 768px) {
    height: 60px;
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
  max-width: 1108px;
  height: 75px;
  margin: 0 auto;
  padding: 0 16px;
  color: rgb(55 65 81);

  @media (max-width: 768px) {
    height: 60px;
  }
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

const imageStyle = css`
  width: 220px;
  height: 60px;

  @media (max-width: 768px) {
    width: 165px;
    height: 45px;
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
          <img
            src="/convert_webp/logo.webp"
            alt="メモブックノート"
            width={220}
            height={60}
            css={imageStyle}
          />
        </Link>
        <LoginModal />
      </div>
    </header>
  );
};

export default memo(Header);
