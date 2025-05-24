import { css } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const normalButtonStyle = css`
  cursor: pointer;
  width: 100%;
  height: 35px;
  background-color: #e3e3e3;
  margin-bottom: 40px;

  &:hover {
    background-color: #5c5c5c;
    color: #e3e3e3;
  }

  svg {
    height: 20px;
  }
`;

const bookButtonStyle = css`
  position: relative;
  cursor: pointer;
  width: 180px;
  height: 240px;
  font-size: 1.4rem;
  font-weight: 600;
  color: #e3e3e3;
  border: none;
  border-bottom-left-radius: 10px;
  background-color: #9d9b9b;
  transition: all 0.3s ease;
  box-shadow: 0 18px 23px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-10px);
  }

  &:before {
    content: "";
    position: absolute;
    right: 10px;
    left: 0;
    bottom: 0;
    width: 9%;
    height: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0.2), transparent);
    transition: all 0.3s ease;
  }

  &:after {
    content: "";
    position: absolute;
    top: auto;
    left: 0;
    bottom: 8px;
    width: 100%;
    height: 20px;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.1));
    transition: all 0.3s ease;
  }
`;

const AddButton = ({ onClick, addCss, isBook = false }) => {
  const buttonStyle = isBook ? bookButtonStyle : normalButtonStyle;

  return (
    <button type="button" css={[buttonStyle, addCss]} onClick={onClick}>
      {isBook ? "「本の追加」" : <FontAwesomeIcon icon={faPlus} />}
    </button>
  );
};

export default AddButton;
