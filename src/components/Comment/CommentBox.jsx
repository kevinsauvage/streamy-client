import { useEffect, useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { getElapsedTime } from "../../helpers/getElapsedTime";
import "./CommentBox.scss";

const CommentBox = ({ comment }) => {
  const { getUserById } = useContext(UserContext);
  const [user, setUser] = useState({});

  useEffect(() => {
    comment?.userId && getUserById(comment.userId).then((data) => setUser(data.user));
  }, [comment, getUserById]);

  return (
    <div className="CommentBox">
      <div className="CommentBox__name">
        <p>{user.firstName}</p>
        <p>{user.lastName}</p>
      </div>
      <p className="CommentBox__date">Commented {getElapsedTime(new Date(comment.createdAt))}</p>
      <p className="CommentBox__content">"{comment.content}"</p>
    </div>
  );
};

export default CommentBox;
