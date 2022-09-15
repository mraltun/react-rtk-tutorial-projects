import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";

const PostAuthor = ({ userId }) => {
  const users = useSelector(selectAllUsers);
  const author = users.find((user) => user.id === userId);

  // The initial state objects doesn't have author field. So, they will shown as Unknown authors.
  return <span>by {author ? author.name : "Unknown author"}</span>;
};

export default PostAuthor;
