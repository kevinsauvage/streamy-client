import "./Play.scss";
import { useLocation, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { extractYearFromDate } from "../../helpers/extractYearFromDate";
import { BsPlayFill } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { FaPhotoVideo } from "react-icons/fa";
import { MdShare } from "react-icons/md";
import requests, { image } from "../../helpers/requests";
import PlaceholderImage from "../../images/placeholder.png";
import Container from "../../layouts/Container/Container";
import CreditBox from "../../components/CreditBox/CreditBox";
import CarouselWrapper from "../../components/CarouselWrapper/CarouselWrapper";
import Page from "../../layouts/Page/Page";
import YoutubeEmbed from "../../components/YoutubeEmbed/YoutubeEmbed";
import { stopScroll, unstopScroll } from "../../helpers/scroll";
import { UserContext } from "../../context/UserContext";
import { MdRemoveCircleOutline } from "react-icons/md";
import apiHelper from "../../helpers/apiHelper";

const Play = () => {
  const { id } = useParams();
  const [type, setType] = useState();
  const [movie, setMovie] = useState();
  const location = useLocation();
  const [similar, setSimilar] = useState([]);
  const [recommendation, setRecommendation] = useState([]);
  const [trailer, setTrailer] = useState();
  const { addToMovieList, removeFromMovieList, userMovies } = useContext(UserContext);

  useEffect(() => window.scrollTo(0, 0), [id]);

  useEffect(() => setType(location?.state?.type), [location]);

  useEffect(() => {
    if (!id && !type) return;

    if (type === "movie") {
      apiHelper(requests.getMovieById.url.replace("{id}", id), null, "get").then((data) =>
        setMovie(data.results)
      );
    }

    if (type === "show" || type === "tv") {
      apiHelper(requests.getShowById.url.replace("{id}", id), null, "get").then((data) =>
        setMovie(data.results)
      );
    }
  }, [id, type]);

  useEffect(() => {
    if (!id && !type) return;
    if (type === "movie") {
      apiHelper(requests.getSimilarMovie.url.replace("{id}", id), null, "get").then((data) =>
        setSimilar(data.results)
      );
    }

    if (type === "show") {
      apiHelper(requests.getSimilarShow.url.replace("{id}", id), null, "get").then((data) =>
        setSimilar(data.results)
      );
    }
  }, [type, id]);

  useEffect(() => {
    if (!id && !type) return;
    if (type === "movie") {
      apiHelper(requests.getRecommendationMovie.url.replace("{id}", id), null, "get").then((data) =>
        setRecommendation(data.results)
      );
    }

    if (type === "show") {
      apiHelper(requests.getRecommendationShow.url.replace("{id}", id), null, "get").then((data) =>
        setRecommendation(data.results)
      );
    }
  }, [type, id]);

  const playTrailer = () => {
    const videooInfo = movie.videos.results.find((item) => item.type === "Trailer");
    setTrailer(videooInfo);
  };

  useEffect(() => {
    if (trailer) stopScroll();
    else unstopScroll();
  }, [trailer]);

  return (
    <div className="Play">
      <Page>
        <div className="Play__banner">
          <div
            className="Play__bannerImg"
            style={{
              backgroundImage: "url(" + image.url.w1280 + movie?.backdrop_path + ")",
            }}
          />
          <div className="Play__btnStart">
            <div className="Play__btnIcon" onClick={playTrailer}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <polygon points="40,30 65,50 40,70"></polygon>
              </svg>
            </div>
            <p>{"Play Trailer"}</p>
          </div>
        </div>
        <Container>
          <div className="Play__details">
            <img
              className="Play__detailsImg"
              src={movie?.poster_path ? `${image.url.w342}${movie?.poster_path}` : PlaceholderImage}
              alt={movie?.original_title || movie?.original_name}
              width="185"
              height="278"
            />
            <div className="Play__detail">
              <h6 className="Play__title">
                {movie?.name || movie?.original_title || movie?.original_name}
              </h6>
              <div className="Play__row">
                <p className="Play__release">
                  {extractYearFromDate(movie?.release_date) ||
                    extractYearFromDate(movie?.first_air_date)}
                </p>
                <p className="Play__average">
                  <span>{movie?.vote_average}</span> / 10
                </p>
                {(movie?.media_type || type) && (
                  <p className="Play__type">
                    {movie?.media_type === "tv" ? "show" : type ? type : movie?.media_type}
                  </p>
                )}
                {movie?.genres &&
                  movie.genres.map((item, i) => (
                    <p key={i} className="Play__genre">
                      {item.name}
                    </p>
                  ))}
              </div>
              <p className="Play__overview">{movie?.overview}</p>
              <CreditBox credits={movie?.credits} />
            </div>
          </div>
          <div className="Play__btns">
            <button className="Play__btn" onClick={playTrailer}>
              <BsPlayFill /> Play Trailer
            </button>

            {userMovies && movie && userMovies.map((item) => item.movie?.id).includes(movie.id) ? (
              <button className="Play__btn" onClick={() => removeFromMovieList(movie)}>
                <MdRemoveCircleOutline />
                Remove from watch list
              </button>
            ) : (
              <button className="Play__btn" onClick={() => addToMovieList(movie, type)}>
                <IoMdAdd />
                Add to watch List
              </button>
            )}
            <button className="Play__btn">
              <FaPhotoVideo /> Comment movie
            </button>
            <button className="Play__btn">
              <MdShare /> Share
            </button>
          </div>
          <div>
            {similar.length > 0 && (
              <CarouselWrapper items={similar} title={`Similar ${type}`} type={type} />
            )}
            {recommendation.length > 0 && (
              <CarouselWrapper items={recommendation} title={`Recommendations`} type={type} />
            )}
          </div>
        </Container>
      </Page>
      {trailer && (
        <div className="Play__trailer">
          <span className="Play__closeTrailer" onClick={() => setTrailer(undefined)}>
            <AiOutlineCloseSquare />
          </span>
          <YoutubeEmbed embedId={trailer.key} />
        </div>
      )}
    </div>
  );
};

export default Play;
