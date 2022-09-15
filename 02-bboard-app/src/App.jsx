import React from "react";
import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";

const App = () => {
  return (
    <main className='App'>
      <PostsList />
      <AddPostForm />
    </main>
  );
};

export default App;
