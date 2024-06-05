import { css } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const normalButtonStyle = css`
  cursor: pointer;
  width: 100%;
  height: 35px;

  &:hover {
    color: black;
    background-color: #ffffff;
  }

  svg {
    height: 20px;
  }
`;

const bookButtonStyle = css`
  cursor: pointer;
  font-size: 1rem;
  width: 180px;
  height: 240px;
  border: none;
  background: #b3c1cf;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 0 18px 23px rgba(0, 0, 0, 0.2);
  border-end-end-radius: 10px;
  margin-right: 4rem;

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
    <button css={[buttonStyle, addCss]} onClick={onClick}>
      {isBook ? "本の追加" : <FontAwesomeIcon icon={faPlus} />}
    </button>
  );
};

export default AddButton;
