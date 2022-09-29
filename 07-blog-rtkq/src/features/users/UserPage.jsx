import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserById } from "./usersSlice";
import { useGetPostsByUserIdQuery } from "../posts/postsSlice";

const UserPage = () => {
  const { userId } = useParams();
  // Pass the state and user id after turning it to number
  const user = useSelector((state) => selectUserById(state, Number(userId)));

  const {
    data: postsForUser,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsByUserIdQuery(userId);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    // We have normalized state, which means state has ids array and entities object that has all the individual posts for the user
    const { ids, entities } = postsForUser;
    content = ids.map((id) => (
      <li key={id}>
        {/* Entities is the lookup object */}
        <Link to={`/post/${id}`}>{entities[id].title}</Link>
      </li>
    ));
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <section>
      <h2>{user?.name}</h2>
      <ol>{content}</ol>
    </section>
  );
};

export default UserPage;
