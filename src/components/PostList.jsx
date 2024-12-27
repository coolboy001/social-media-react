import { useContext, useEffect } from "react";
import Post from "./Post";
import { PostListContext } from "../store/post-list-store";

const PostList = () => {
  const { postList, fetchIntialPosts } = useContext(PostListContext);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch("https://dummyjson.com/posts", { signal })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.posts);
        fetchIntialPosts(data.posts);
      });
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <>
      {postList.map((x) => (
        <Post post={x} />
      ))}
    </>
  );
};

export default PostList;
