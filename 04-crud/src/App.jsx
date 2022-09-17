import React from "react";
import { Routes, Route } from "react-router-dom";
import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";
import SinglePostPage from "./features/posts/SinglePostPage";
import Layout from "./components/Layout";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />} />
      <Route index element={<PostsList />} />

      <Route path='post'>
        <Route index element={<AddPostForm />} />
        <Route path=':postId' element={<SinglePostPage />} />
      </Route>
    </Routes>
  );
};

export default App;
