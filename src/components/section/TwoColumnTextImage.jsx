import { css } from "@emotion/react";
import AnimationItem from "../../lib/AnimationItem";

const container = css`
  margin: 60px auto;
  max-width: 1140px;
  width: 100%;
  padding-bottom: 60px;
  border-bottom: 1px dashed gray;
`;

const twoColumnContainer = (inversion) => css`
  width: 100%;
  max-width: 1140px;
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: center;
  align-items: center;
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
