import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { css } from "@emotion/react";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";

const customStyle = css`

li {
  width: 90px;
}
`;

const containerStyle = css`
  width: 100%;
  height: 550px;
  max-width: 1000px;
  margin: 0 auto;
`;

const sliderImageStyle = css`
  text-align: center;
  margin: 20px auto;
`;

const sliderSmallImageStyle = css`
  padding-right: 20px !important;
  display: inline-block !important;
`;

const textStyle = css`
  text-align: center;
`;

const h3Style = css`
  text-align: center;
  margin: 0 auto;
`;

const sliderContainer = css`
  display: flex;
  margin: 40px 0;
`;

const ImageSlider = ({ items }) => {
  const settings = {
    customPaging: function (i) {
      return (
        <img
          src={items[i].imageUrl}
          alt={items[i].imageAlt}
          width={80}
          height={60}
          css={sliderSmallImageStyle}
        />
      );
    },
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div css={[containerStyle, customStyle]}>
      <Slider {...settings}>
        {items.map((item) => (
          <div css={sliderContainer} key={item.h3}>
            <img
              src={item.imageUrl}
              alt={item.imageAlt}
              width={380}
              height={260}
              css={sliderImageStyle}
            />
                        <h3 css={h3Style}>{item.h3}</h3>
            <p css={textStyle}>{item.text}</p>
            <p css={textStyle}>{item.text2}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
