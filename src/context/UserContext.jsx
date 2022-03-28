import { createContext, useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiRoutes from "../data/apiRoutes";
import apiHelper from "../helpers/apiHelper";
import { getItem, setItem } from "../helpers/sessionStorage";

export const UserContext = createContext();

const { Provider } = UserContext;

export const UserProvider = (props) => {
  const [userMovies, setUserMovies] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const getUserMovies = useCallback(() => {
    const user = getItem("user");
    const userMovies = user?.savedMovies;
    if (userMovies) setUserMovies(userMovies);
  }, []);

  useEffect(() => getUserMovies(), [getUserMovies]);

  const update = async (firstName, lastName, email, savedMovies, id) => {
    const res = await apiHelper(
      `${apiRoutes.users}/${id}`,
      { firstName, lastName, email, savedMovies },
      "PUT"
    );
    res && res?.user && setItem("user", res.user);
    return res;
  };

  const addToMovieList = async (movie, type) => {
    const user = getItem("user");

    if (!user)
      return navigate("/login", { state: { path: location.pathname, type: type, movie: movie } });

    const userMovies = user?.savedMovies;

    const isSaved = userMovies.find((item) => item.movie.id === movie.id);

    if (isSaved) {
      return toast.error(`${movie.title || movie.name} is already saved to your watch list`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    const newMovies = [...userMovies, { movie, type }];

    const res = await update(undefined, undefined, undefined, newMovies, user.id);

    if (res && res.success) {
      getUserMovies();

      return toast.success(
        `${movie.title || movie.name} as correctly been added to your watch list`,
        {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
    }
  };

  const removeFromMovieList = async (movie) => {
    const user = getItem("user");

    const userMovies = user?.savedMovies;

    const filtered = userMovies.filter((item) => item.movie.id !== movie.id);

    const res = await update(undefined, undefined, undefined, filtered, user.id);

    if (res && res.success) {
      getUserMovies();
      return toast.success(
        `${movie.title || movie.name} as correctly been deleted from your watch list`,
        {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
    }
  };

  const handleLogOut = () => {
    window.sessionStorage.removeItem("user_token_streamy");
    window.sessionStorage.removeItem("user");
    setUserMovies([]);
    navigate("/login");
  };

  const getUserById = async (id) => {
    return await apiHelper(`${apiRoutes.users}/${id}`, null, "GET");
  };

  const value = {
    update,
    addToMovieList,
    removeFromMovieList,
    userMovies,
    handleLogOut,
    getUserMovies,
    getUserById,
  };

  return <Provider value={value}>{props.children}</Provider>;
};
