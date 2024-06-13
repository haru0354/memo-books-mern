import { css } from "@emotion/react";
import { fa1, fa2, fa3 } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const container = css`
  display: flex;
  flex-wrap: wrap;
  margin-top: 60px;
  margin-left: auto;
  margin-right: auto;
  max-width: 1100px;
  width: 100%;
  padding-bottom: 60px;

  svg {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    padding: 10px;
    border: 1px dashed #003b95;
    background-color: #b4d2ff;
  }
`;

const numberStyle = css`
  position: absolute;
  top: -25px;
  left: 44%;
`;

const h3Style = css`
  text-align: center;
  font-size: 1.4rem;
`;

const firstArea = css`
  position: relative;
  width: 100%;
  max-width: 320px;
  min-height: 280px;
  padding: 40px 10px;
  margin: 20px auto;
  border: 1px solid rgb(193 193 193);
  border-radius: 4px;
  background-color: #fffdfb;
`;

const secondArea = css`
  position: relative;
  width: 100%;
  max-width: 320px;
  padding: 40px 10px;
  margin: 20px auto;
  border: 1px solid rgb(193 193 193);
  border-radius: 4px;
  background-color: #fffdfb;
`;

const thirdArea = css`
  position: relative;
  width: 100%;
  max-width: 320px;
  padding: 40px 10px;
  margin: 20px auto;
  border: 1px solid rgb(193 193 193);
  border-radius: 4px;
  background-color: #fffdfb;
`;

const ThreePoint = ({
  firstTitle,
  secondTitle,
  thirdTitle,
  firstText,
  firstTextSecond,
  secondText,
  secondTextSecond,
  thirdText,
  thirdTextSecond,
}) => {
  return (
    <div css={container}>
      <div css={firstArea}>
        <FontAwesomeIcon icon={fa1} css={numberStyle} />
        <h3 css={h3Style}>{firstTitle}</h3>
        <p>{firstText}</p>
        <p>{firstTextSecond}</p>
      </div>
      <div css={secondArea}>
        <FontAwesomeIcon icon={fa2} css={numberStyle} />
        <h3 css={h3Style}>{secondTitle}</h3>
        <p>{secondText}</p>
        <p>{secondTextSecond}</p>
      </div>
      <div css={thirdArea}>
        <FontAwesomeIcon icon={fa3} css={numberStyle} />
        <h3 css={h3Style}>{thirdTitle}</h3>
        <p>{thirdText}</p>
        <p>{thirdTextSecond}</p>
      </div>
    </div>
  );
};

export default ThreePoint;
