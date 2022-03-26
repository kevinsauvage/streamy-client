import "./Carousel.scss";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import Indicators from "./Indicators";
import useCarouselFonctions from "./useCarouselFonctions";
import { Children, useRef } from "react";

const Carousel = ({ children, width, padding }) => {
  const carousel = useRef();

  const { handleTouchEnd, handleTouchMove, handleTouchStart, page, itemsShow, updateActive, childrensCount } =
    useCarouselFonctions(carousel, children, width);

  return (
    <div
      ref={carousel}
      className="Carousel"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}>
      <button
        aria-label="arrow left"
        style={{ opacity: page === 0 ? "0.1" : null }}
        className={"Carousel__arrow--left Carousel__arrow"}
        onClick={() => updateActive(page - 1)}>
        <BsArrowLeftShort />
      </button>
      <div className="Carousel__inner" style={{ transform: `translateX(-${page * 100}%)` }}>
        {Children.map(children || null, (child, i) => {
          return (
            <div
              key={i}
              style={{
                width: `${100 / itemsShow}%`,
                paddingRight: `${padding}px`,
              }}
              className="Carousel__item">
              <child.type {...child.props} />
            </div>
          );
        })}
      </div>
      <button
        aria-label="arrow right"
        className={"Carousel__arrow--right Carousel__arrow"}
        onClick={() => updateActive(page + 1)}>
        <BsArrowRightShort />
      </button>
      {itemsShow && (
        <Indicators
          page={page}
          updateActive={updateActive}
          itemsShow={itemsShow}
          childrensCount={childrensCount}
        />
      )}
    </div>
  );
};

export default Carousel;
