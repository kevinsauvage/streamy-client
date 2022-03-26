import { useState } from "react";
import BigMovieCard from "../BigMovieCard/BigMovieCard";
import "./Slide.scss";
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";

const Carousel = ({ items }) => {
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState();
  const [touchEnd, setTouchEnd] = useState();
  const [animate, setAnimate] = useState(false);

  const updateIndex = (newIndex) => {
    setTouchStart();
    setTouchEnd();
    if (newIndex <= 0) return setIndex(0);
    if (newIndex >= items?.length) return setIndex(items?.length - 1);
    animateCard();
    return setIndex(newIndex);
  };

  const animateCard = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 1000);
  };

  // SLIDER
  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);

  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const handleTouchEnd = () => {
    touchStart - touchEnd > 100 && updateIndex(index + 1);
    touchStart - touchEnd < -100 && updateIndex(index - 1);
    return;
  };

  return (
    <div
      className="Slide"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}>
      <div className="Slide__arrow Slide__arrow--left" onClick={() => updateIndex(index - 1)}>
        <MdOutlineArrowBackIosNew />
      </div>

      <BigMovieCard movie={items?.[index]} title={"TRENDING"} animate={animate} />
      <div className="Slide__arrow Slide__arrow--right" onClick={() => updateIndex(index + 1)}>
        <MdOutlineArrowForwardIos />
      </div>
    </div>
  );
};

export default Carousel;
