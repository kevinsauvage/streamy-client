import "./BigMovieCard.scss";
import { image } from "../../helpers/requests";
import { extractYearFromDate } from "../../helpers/extractYearFromDate";
import CardBtns from "../CardBtns/CardBtns";
import Container from "../../layouts/Container/Container";
import { truncateString } from "../../helpers/truncate";
import { Link } from "react-router-dom";

const BigMovieCard = ({ movie, title, animate, type }) => {
  return (
    <div className={animate ? "BigMovieCard BigMovieCard--animate" : "BigMovieCard"}>
      <img
        className="BigMovieCard__img"
        src={`${window.innerWidth < 800 ? image.url.w500 : image.url.w1280}${movie?.backdrop_path}`}
        alt={movie?.original_title || movie?.original_name}
        width="2000"
        height="1125"
        loading="lazy"
      />
      <div className="BigMovieCard__detail">
        <Container>
          <p className="BigMovieCard__title">{title}</p>
          <Link to={`/play/${movie?.id}`} state={{ type: type || movie?.media_type }}>
            <h2 className="BigMovieCard__name">{movie?.original_title || movie?.original_name}</h2>
          </Link>
          <div className="BigMovieCard__row">
            <p className="BigMovieCard__date">
              {extractYearFromDate(movie?.release_date) || extractYearFromDate(movie?.first_air_date)}{" "}
            </p>
            <div className="BigMovieCard__note">
              <span>{movie?.vote_average}</span> / 10
            </div>
            <p className="BigMovieCard__type">{movie?.media_type === "tv" ? "show" : movie?.media_type}</p>
          </div>
          <p className="BigMovieCard__overview">{movie && truncateString(movie?.overview, 200)}</p>
          <CardBtns movie={movie} type={movie?.media_type === "tv" ? "show" : movie?.media_type} />
        </Container>
      </div>
    </div>
  );
};

export default BigMovieCard;
