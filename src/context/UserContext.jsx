import { createContext, useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import apiRoutes from "../data/apiRoutes";
import apiHelper from "../helpers/apiHelper";
import { getItem, setItem } from "../helpers/sessionStorage";

export const UserContext = createContext();

const { Provider } = UserContext;

export const UserProvider = (props) => {
  const [userMovies, setUserMovies] = useState([]);

  const getUserMovies = useCallback(() => {
    const user = getItem("user");
    const userMovies = user?.savedMovies;
    if (userMovies) setUserMovies(userMovies);
  }, []);

  useEffect(() => {
    getUserMovies();
  }, [getUserMovies]);

  const register = async (firstName, lastName, email, password) => {
    return await apiHelper(apiRoutes.users, { firstName, lastName, email, password });
  };

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
    const userMovies = user.savedMovies;

    console.log(userMovies);

    const isSaved = userMovies.find((item) => item.movie.id === movie.id);

    console.log(isSaved);

    if (isSaved) return;

    const newMovies = [...userMovies, { movie, type }];

    const res = await update(undefined, undefined, undefined, newMovies, user.id);

    if (res.success) {
      getUserMovies();

      return toast.success(`${movie.original_title} as correctly been added to your watch list`, {
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
  };

  const removeFromMovieList = async (movie) => {
    const user = getItem("user");
    const userMovies = user.savedMovies;

    const filtered = userMovies.filter((item) => item.movie.id !== movie.id);

    const res = await update(undefined, undefined, undefined, filtered, user.id);

    if (res.success) {
      getUserMovies();
      return toast.success(
        `${movie.original_title} as correctly been deleted from your watch list`,
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

  const value = { register, update, addToMovieList, removeFromMovieList, userMovies };

  return <Provider value={value}>{props.children}</Provider>;
};
