import "./MediumMovieCard.scss";
import { image } from "../../helpers/requests";
import Wrapper from "../../layouts/Wrapper/Wrapper";
import { extractYearFromDate } from "../../helpers/extractYearFromDate";
import PlaceholderImage from "../../images/placeholder.png";
import { Link } from "react-router-dom";
import { truncateString } from "../../helpers/truncate";
import { useRef, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { MdRemoveCircleOutline } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

const MediumMovieCard = ({ movie, type }) => {
  const card = useRef(null);
  const { userMovies, removeFromMovieList, addToMovieList } = useContext(UserContext);

  return (
    <div className={`MediumMovieCard`} ref={card}>
      <div className={`MediumMovieCard__imgWrapper`}>
        <div className={`MediumMovieCard__imgWrapper-hover`}>
          {userMovies && movie && userMovies.map((item) => item.movie?.id).includes(movie.id) ? (
            <button
              className="MediumMovieCard__imgWrapper-hover__btn"
              onClick={() => removeFromMovieList(movie)}>
              <MdRemoveCircleOutline />
              watch list
            </button>
          ) : (
            <button
              className="MediumMovieCard__imgWrapper-hover__btn"
              onClick={() => addToMovieList(movie, type)}>
              <IoMdAdd />
              watch List
            </button>
          )}
        </div>
        <img
          className="MediumMovieCard__img"
          loading="lazy"
          src={
            movie?.poster_path
              ? `${window.innerWidth < 500 ? image.url.w185 : image.url.w342}${movie?.poster_path}`
              : PlaceholderImage
          }
          alt={movie?.original_title || movie?.original_name}
          width="185"
          height="278"
        />
      </div>
      <div className="MediumMovieCard__detail">
        <Link to={`/play/${type || movie?.media_type}/${movie.id}`}>
          <p className="MediumMovieCard__title">
            {truncateString(
              movie?.title || movie?.original_title || movie?.original_name || "",
              20
            )}
          </p>
        </Link>
        <Wrapper>
          <p className="MediumMovieCard__release">
            {extractYearFromDate(movie?.release_date) || extractYearFromDate(movie?.first_air_date)}
          </p>
          <p className="MediumMovieCard__average">
            <span>{movie?.vote_average?.toFixed()}</span> / 10
          </p>
          {(movie?.media_type || type) && (
            <p className="MediumMovieCard__genre">
              {movie?.media_type === "tv" ? "show" : type ? type : movie?.media_type}
            </p>
          )}
        </Wrapper>
      </div>
    </div>
  );
};

export default MediumMovieCard;
