import { useState, useEffect } from "react";
import "./Acordeon.scss";
import Title from "../Title/Title";
import AcordeonCard from "./AcordeonCard/AcordeonCard";
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";
import Container from "../../layouts/Container/Container";
import apiHelper from "../../helpers/apiHelper";

const Acordeon = ({ url, title, type }) => {
  const [index, setIndex] = useState(0);
  const [movies, setMovies] = useState([]);
  const [touchStart, setTouchStart] = useState();
  const [touchEnd, setTouchEnd] = useState();
  const [isSmaller820] = useState(window.innerWidth < 820);

  useEffect(() => apiHelper(url, null, "get").then((data) => setMovies(data.results)), [url]);

  const handleNext = () => {
    setTouchStart();
    setTouchEnd();
    if (index >= movies.length - 2) return;
    return setIndex(index + 1);
  };

  const handlePrev = () => {
    setTouchStart();
    setTouchEnd();
    if (isSmaller820 && index <= 0) return;
    if (index <= -1) return;
    return setIndex(index - 1);
  };

  // SLIDER
  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);

  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const handleTouchEnd = () => {
    touchStart - touchEnd > 100 && handleNext();
    touchStart - touchEnd < -100 && handlePrev();
    return;
  };

  return (
    <div
      className="Acordeon"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}>
      <Container>
        <Title title={title} />
      </Container>
      <div className="Acordeon__wrapper">
        <div onClick={handlePrev} className="Acordeon__arrow Acordeon__arrow--previus">
          <MdOutlineArrowBackIosNew />
        </div>

        <div
          className="Acordeon__inner"
          style={{
            transform:
              index === -1
                ? `translateX(${isSmaller820 ? 0 : 33}%)`
                : `translateX(-${isSmaller820 ? (index - 1) * 33 : index * 33}%)`,
          }}>
          {movies &&
            movies?.length > 0 &&
            movies.map((movie, i) => (
              <AcordeonCard
                movie={movie}
                key={movie.id}
                type={type}
                active={isSmaller820 ? index === i : i === index + 1}
                activeLeft={isSmaller820 ? index - 1 === i : index === -1 ? false : i === index}
                activeRight={
                  isSmaller820 ? index + 1 === i : index === -1 ? i === 1 : i === index + 2
                }
              />
            ))}
        </div>
        <div onClick={handleNext} className="Acordeon__arrow Acordeon__arrow--next">
          <MdOutlineArrowForwardIos />
        </div>
      </div>
    </div>
  );
};

export default Acordeon;
