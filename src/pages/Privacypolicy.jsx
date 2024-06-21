import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import { main1ColumnStyle, oneColumnContainerStyle } from "../styles/styles";

const Privacypolicy = () => {

  return (
    <>
      <Helmet>
        <title>メモブックの一覧 | メモブックノート</title>
        <meta
          name="description"
          content="登録をしたメモブックの一覧ページです。今までに登録をした本の一覧が表示されます。各本の中にはチャプターやメモの登録か閲覧をすることができます。"
        />
      </Helmet>
      <div css={main1ColumnStyle}>
        <div css={oneColumnContainerStyle}>
          gegreg
        </div>
      </div>
    </>
  );
};

export default Privacypolicy;
