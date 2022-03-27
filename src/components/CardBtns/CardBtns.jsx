import "./CardBtns.scss";
import { BsPlayFill } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { MdRemoveCircleOutline } from "react-icons/md";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";

const CardBtns = ({ movie, type }) => {
  const { addToMovieList, removeFromMovieList, userMovies } = useContext(UserContext);

  return (
    <div className="CardBtns">
      <Link
        className="CardBtns__btn"
        to={`/play/${movie?.id}`}
        state={{ type: type || movie?.media_type }}>
        <BsPlayFill /> See details
      </Link>
      {userMovies && movie && userMovies.map((item) => item.movie?.id).includes(movie.id) ? (
        <button className="CardBtns__btn" onClick={() => removeFromMovieList(movie)}>
          <MdRemoveCircleOutline />
          watch list
        </button>
      ) : (
        <button className="CardBtns__btn" onClick={() => addToMovieList(movie, type)}>
          <IoMdAdd />
          watch List
        </button>
      )}
    </div>
  );
};

export default CardBtns;
