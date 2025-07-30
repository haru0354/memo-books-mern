import { useEffect, useState } from "react";
import { css } from "@emotion/react";

const buttonStyle = css`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  font-weight: bold;
  border-radius: 9999px;
  color: white;
  background-color: #60a5fa;
  transition: background-color 0.3s;
  z-index: 10;
  cursor: pointer;

  &:hover {
    background-color: #1d4ed8;
  }

  @media (min-width: 768px) {
    bottom: 2rem;
    right: 4rem;
  }
`;

const BackToTopButton = ({children}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button onClick={backToTop} type="button" css={buttonStyle}>
          {children}
        </button>
      )}
    </>
  );
};

export default BackToTopButton;
