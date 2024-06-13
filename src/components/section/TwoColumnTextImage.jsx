import { css } from "@emotion/react";

const container = css`
  margin: 60px auto;
  max-width: 1100px;
  width: 100%;
  padding-bottom: 60px;
  border-bottom: 1px dashed gray;
`;

const twoColumnContainer = (inversion) => css`
  width: 100%;
  max-width: 1100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-right: auto;
  margin-left: auto;
  margin-top: 4rem;


  ${inversion &&
  css`
    flex-direction: row-reverse;
  `}
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

export const h3Style = css`
  text-align: center;
  font-size: 1.4rem;
`

const TwoColumnRightImage = ({
  title,
  contentTop,
  contentCenter,
  contentBottom,
  inversion = false,
}) => {
  return (
      <div css={container}>
        <h3 css={h3Style}>{title}</h3>
        <div css={twoColumnContainer(inversion)}>
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
  );
};

export default TwoColumnRightImage;
