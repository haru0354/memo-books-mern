import { css } from "@emotion/react";
import AnimationItem from "../../lib/AnimationItem";

const container = css`
  max-width: 1140px;
  width: 100%;
  margin: 60px auto;
  padding-bottom: 60px;
  border-bottom: 1px dashed gray;
`;

const twoColumnContainer = (inversion) => css`
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: center;
  align-items: center;
  max-width: 1140px;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  margin-top: 4rem;

  ${inversion &&
  css`
    flex-direction: row-reverse;
  `}

  img {
    border: 1px solid rgb(203 201 199);
  }
`;

const leftColumn = css`
  max-width: 450px;
  width: 100%;
  margin: 0 auto;
`;

const rightColumn = css`
  max-width: 380px;
  max-height: 300px;
  width: 100%;
  margin: 0 auto;
`;

const h3Style = css`
  text-align: center;
  font-size: 1.4rem;
`;

const imageStyle = css`
  width: 100%;
`;

const TwoColumnTextImage = ({
  animationStyle,
  title,
  contentTop,
  contentCenter,
  contentBottom,
  imgSrc,
  imgAlt,
  inversion = false,
}) => {
  return (
    <AnimationItem elType="div" animation={animationStyle} emotionCss={container}>
      <h3 css={h3Style}>{title}</h3>
      <div css={twoColumnContainer(inversion)}>
        <div css={leftColumn}>
          <p>{contentTop}</p>
          <p>{contentCenter}</p>
          <p>{contentBottom}</p>
        </div>
        <div css={rightColumn}>
          <img
            src={imgSrc}
            alt={imgAlt}
            width={380}
            height={260}
            css={imageStyle}
          />
        </div>
      </div>
    </AnimationItem>
  );
};

export default TwoColumnTextImage;
