import { css } from "@emotion/react";
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const arrowStyle = css`
  cursor: pointer;
  position: absolute;
  top: 32%;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  right: 20px;
  z-index: 10;

  @media (max-width: 768px) {
    top: 27%;
    right: 0px;
    width: 45px;
    height: 45px;
  }

  svg {
    position: absolute;
    right: 3px;
    bottom: 3px;
    width: 20px;
    height: 20px;
    color: #0e3268;

    @media (max-width: 768px) {
      width: 35px;
      height: 35px;
    }
  }
`;

export const NextArrow = ({ onClick }) => {
  return (
    <button css={arrowStyle} onClick={onClick}>
      <FontAwesomeIcon icon={faCircleRight} />
    </button>
  );
};

export default NextArrow;
