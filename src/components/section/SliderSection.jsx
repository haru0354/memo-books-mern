import ImageSlider from "../slider/ImageSlider";

const SliderSection = () => {
  return (
    <section>
      <h2 css={sectionH2Style}>メモブックの使い方の例</h2>
      <ImageSlider items={sliderItems} />
    </section>
  );
};

export default SliderSection;
