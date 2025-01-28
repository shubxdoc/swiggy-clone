import { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import { VscArrowSmallLeft, VscArrowSmallRight } from "react-icons/vsc";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({
  title,
  customHeaderClass,
  data,
  slidesToShow,
  slidesToScroll,
  renderItem,
}) => {
  const [isStart, setIsStart] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const sliderRef = useRef(null);

  const updateSliderState = (currentSlide) => {
    const totalSlides = data.length;
    const lastVisibleSlide = totalSlides - slidesToShow;

    setIsStart(currentSlide === 0);
    setIsEnd(currentSlide >= lastVisibleSlide);
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow,
    slidesToScroll,
    arrows: false,
    beforeChange: (current, next) => updateSliderState(next),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: title == "Deals for you" ? 2 : 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
        },
      },
    ],
  };

  useEffect(() => {
    updateSliderState(0);
  }, [data]);

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <h2 className={`text-2xl font-extrabold ${customHeaderClass}`}>
          {title}
        </h2>
        <div className="flex gap-3 text-gray-800">
          <button
            onClick={() => sliderRef.current.slickPrev()}
            className={`bg-gray-200 rounded-full ${
              isStart ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isStart}
          >
            <VscArrowSmallLeft size={"2em"} />
          </button>
          <button
            onClick={() => sliderRef.current.slickNext()}
            className={`bg-gray-200 rounded-full ${
              isEnd ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isEnd}
          >
            <VscArrowSmallRight size={"2em"} />
          </button>
        </div>
      </div>

      {data.length > 0 && (
        <div className="slider-container">
          <Slider ref={sliderRef} {...settings}>
            {data.map((item, index) => (
              <div key={index} className="px-2">
                {renderItem(item)}
              </div>
            ))}
          </Slider>
        </div>
      )}
    </>
  );
};

export default Carousel;
