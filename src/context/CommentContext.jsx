import { createContext } from "react";
import apiRoutes from "../data/apiRoutes";
import apiHelper from "../helpers/apiHelper";

export const commentContext = createContext();

const { Provider } = commentContext;

export const CommentProvider = (props) => {
  const createComment = async (comment, movieId) => {
    return await apiHelper(apiRoutes.comment, { content: comment, movieId }, "POST");
  };

  const getCommentsByMovieId = async (movieId, page) => {
    return await apiHelper(`${apiRoutes.comment}/${movieId}?p=${page}`, null, "GET");
  };

  const value = { createComment, getCommentsByMovieId };

  return <Provider value={value}>{props.children}</Provider>;
};
