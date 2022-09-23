import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserById } from "./usersSlice";
import { selectAllPosts } from "../posts/postsSlice";

const UserPage = () => {
  const { userId } = useParams();
  // Pass the state and user id after turning it to number
  const user = useSelector((state) => selectUserById(state, Number(userId)));

  const postsForUser = useSelector((state) => {
    const allPosts = selectAllPosts(state);
    // Filter the posts with the user id we got from above
    return allPosts.filter((post) => post.userId === Number(userId));
  });

  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/post/${post.id}`}>{post.title}</Link>
    </li>
  ));

  return (
    <section>
      <h2>{user?.name}</h2>
      <ol>{postTitles}</ol>
    </section>
  );
};

export default UserPage;
