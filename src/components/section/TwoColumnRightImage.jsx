import { css } from "@emotion/react";
import { sectionH3Style } from "../../styles/styles";

const container = css`
  margin: 60px auto;
  max-width: 1100px;
  width: 100%;
`;

const TwoColumnContainer = css`
  width: 100%;
  max-width: 1100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const leftColumn = css`
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
`;

const rightColumn = css`
  width: 100%;
  max-width: 380px;
  max-height: 300px;
  margin: 0 auto;

`;

const TwoColumnRightImage = ({
  title,
  contentTop,
  contentCenter,
  contentBottom,
}) => {
  return (
    <section>
      <div css={container}>
        <h3 css={sectionH3Style}>{title}</h3>
        <div css={TwoColumnContainer}>
          <div css={leftColumn}>
            <p>{contentTop}</p>
            <p>{contentCenter}</p>
            <p>{contentBottom}</p>
          </div>
          <div css={rightColumn}>
            <img src="" alt="" width={380} height={260} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TwoColumnRightImage;
