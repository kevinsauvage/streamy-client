import "./AcordeonCard.scss";
import { image } from "../../../helpers/requests";
import CardBtns from "../../CardBtns/CardBtns";
import { truncateString } from "../../../helpers/truncate";
import { Link } from "react-router-dom";
import { useRef } from "react";

const AcordeonCard = ({ movie, active, activeLeft, activeRight, type }) => {
  const card = useRef(null);

  return (
    <div
      ref={card}
      className={`AcordeonCard ${active && "AcordeonCard__active"} ${
        activeLeft && "AcordeonCard__active--side AcordeonCard__active--left"
      } ${activeRight && "AcordeonCard__active--side AcordeonCard__active--right"}`}>
      <img
        className="AcordeonCard__img"
        src={
          window.innerWidth < 820
            ? `${image.url.w342}${movie?.poster_path}`
            : `${image.url.w500}${movie?.poster_path}`
        }
        alt={movie?.name || movie?.original_title || movie?.original_name}
        width="500"
        height="750"
        loading="lazy"
      />
      <div className="AcordeonCard__detail">
        <Link to={`/play/${type || movie?.media_type}/${movie.id}`}>
          <h6 className="AcordeonCard__title">
            {movie?.title || movie?.original_title || movie?.original_name}
          </h6>
        </Link>
        <p className="AcordeonCard__overview">{truncateString(movie?.overview, 200)}</p>
        <CardBtns movie={movie} type={type} />
      </div>
    </div>
  );
};

export default AcordeonCard;
