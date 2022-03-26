import "./CarouselWrapper.scss";
import { useState, useEffect } from "react";
import Carousel from "../Carousel/Carousel";
import MediumMovieCard from "../MediumMovieCard/MediumMovieCard";
import Title from "../Title/Title";
import apiHelper from "../../helpers/apiHelper";

const CarouselWrapper = ({ url, title, type, items }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (url) {
      apiHelper(url, null, "get").then((data) => setMovies(data.results));
    } else setMovies(items);
  }, [url, items]);

  return (
    <div className="CarouselWrapper">
      <Title title={title} />
      <Carousel width={270} padding={20}>
        {movies?.length > 0 &&
          movies.map((item) => <MediumMovieCard movie={item} key={item.id} type={type} />)}
      </Carousel>
    </div>
  );
};

export default CarouselWrapper;
