import { css } from "@emotion/react";
import Button from "../ui/Button";

const ctaSection = css`
  padding-top: 60px;
  padding-bottom: 60px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #25448b;
`;

const ctaContainer = css`
  text-align: center;
  padding: 40px;
  margin: 0px auto;
  max-width: 700px;
  border: 1px solid #25448b;
  border-radius: 4px;
  background-color: #fffdfb;
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
      <div css={ctaContainer}>
        <h2 css={sectionH2Style}>{title}</h2>
        <p>{topText}</p>
        <p>{centerText}</p>
        <p>{bottomText}</p>
        <Button onClick={scrollToForm} color="blue">{buttonText}</Button>
      </div>
    </section>
  );
};

export default CtaSection;
