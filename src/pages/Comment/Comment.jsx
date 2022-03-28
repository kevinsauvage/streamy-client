import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useCallback } from "react";
import { toast } from "react-toastify";
import "./Comment.scss";
import Page from "../../layouts/Page/Page";
import apiHelper from "../../helpers/apiHelper";
import requests, { image } from "../../helpers/requests";
import Title from "../../components/Title/Title";
import { commentContext } from "../../context/CommentContext";
import CommentBox from "../../components/Comment/CommentBox";

const Comment = () => {
  const { id, type } = useParams();
  const [movie, setMovie] = useState();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const { createComment, getCommentsByMovieId } = useContext(commentContext);

  useEffect(() => window.scrollTo(0, 0), [id]);

  const getComments = useCallback(async () => {
    const res = await getCommentsByMovieId(id, page);
    if (res.success) {
      setComments(res.data.comments);
      setCount(res.data.count);
    }
  }, [id, getCommentsByMovieId, page]);

  useEffect(() => getComments(), [getComments]);

  useEffect(() => {
    if (type === "movie") {
      apiHelper(requests.getMovieById.url.replace("{id}", id), null, "get").then((data) => {
        data?.id && setMovie(data);
      });
    }

    if (type === "show" || type === "tv") {
      apiHelper(requests.getShowById.url.replace("{id}", id), null, "get").then(
        (data) => data?.id && setMovie(data)
      );
    }
  }, [id, type]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment.length) return;

    const res = await createComment(comment, id);

    if (res.success) {
      setComment("");
      getComments();

      return toast.success(`The comment was correctly added`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      return toast.error(`Oops, something went wrong. Please, try again.`, {
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

  const handleUpdate = (newPage) => {
    if (newPage < 0 || newPage >= count / 5) return;
    setPage(newPage);
  };

  return (
    <div className="Comment">
      <Page>
        <div
          className="Comment__banner"
          style={{
            backgroundImage: "url(" + image.url.w1280 + movie?.backdrop_path + ")",
          }}>
          <form className="Comment__form" onSubmit={handleSubmit}>
            <Title title="Add your comment" />
            <textarea
              className="Comment__textArea"
              onChange={(e) => setComment(e.target.value)}
              value={comment}></textarea>
            <button className="Comment__form-btn" type="submit">
              Post
            </button>
          </form>
        </div>
        <div className="Comment__list">
          <div className="Comment__list-container">
            <Title title="Last comments" />

            {comments.length ? (
              comments.map((comment) => <CommentBox comment={comment} key={comment._id} />)
            ) : (
              <p>Nothing has been added yet.</p>
            )}
          </div>
        </div>
        {comments.length !== 0 && (
          <div className="Comment__pagination">
            <button className="Comment__pagination-btn" onClick={() => handleUpdate(page - 1)}>
              prev
            </button>

            {[...Array(Math.ceil(count / 5)).keys()].map((item) => {
              if (item !== 0 && page - 2 > item) return <p>.</p>;

              if (item !== Math.ceil(count / 5) - 1 && page + 2 < item) return <p>.</p>;

              return (
                <span
                  className={`Comment__pagination-num ${
                    item === page ? "Comment__pagination-num--active" : ""
                  }`}
                  onClick={() => setPage(item)}>
                  {item}
                </span>
              );
            })}
            <button className="Comment__pagination-btn" onClick={() => handleUpdate(page + 1)}>
              next
            </button>
          </div>
        )}
      </Page>
    </div>
  );
};

export default Comment;
