import { css } from "@emotion/react";
import AnimationItem from "../../lib/AnimationItem";
import Button from "../ui/Button";

const ctaSection = css`
  padding: 60px 20px;
  background-color: #25448b;

  @media (max-width: 768px) {
    padding: 20px 10px;
  }
`;

const ctaContainer = css`
  max-width: 700px;
  margin: 0px auto;
  padding: 40px;
  text-align: center;
  border: 1px solid #25448b;
  border-radius: 4px;
  background-color: #fffdfb;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const sectionH2Style = css`
  text-align: center;
  margin-top: 0rem;
  margin-bottom: 2rem;
  font-size: 1.8rem;
  font-weight: 600;
`;

const CtaSection = ({ title, topText, centerText, bottomText, buttonText }) => {
  const scrollToForm = () => {
    const formSection = document.getElementById("form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section css={ctaSection}>
      <AnimationItem
        elType="div"
        animation="fadeInScale"
        emotionCss={ctaContainer}
      >
        <h2 css={sectionH2Style}>{title}</h2>
        <p>{topText}</p>
        <p>{centerText}</p>
        <p>{bottomText}</p>
        <Button type="button" onClick={scrollToForm} color="blue">
          {buttonText}
        </Button>
      </AnimationItem>
    </section>
  );
};

export default CtaSection;
