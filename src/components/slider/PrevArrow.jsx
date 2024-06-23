import { css } from "@emotion/react";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const arrowStyle = css`
  cursor: pointer;
  position: absolute;
  top: 32%;
  width: 30px;
  height: 30px;
  left: 20px;
  border-radius: 50%;
  z-index: 10;

  @media (max-width: 768px) {
    top: 27%;
    left: 0px;
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

export const PrevArrow = ({ onClick }) => {
  return (
    <div>
      <button css={arrowStyle} onClick={onClick} title="前に戻るボタン">
        <FontAwesomeIcon icon={faCircleLeft} />
      </button>
    </div>
  );
};

export default PrevArrow;
