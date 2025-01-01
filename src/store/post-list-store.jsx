import { createContext, useReducer, useEffect } from "react";

export const PostListContext = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});

const postListReducer = (currentPostList, action) => {
  let updatedPostList = currentPostList;
  if (action.type === "DELETE_POST") {
    updatedPostList = currentPostList.filter((x) => x.id !== action.payload.id);
  } else if (action.type === "CREATE_POST") {
    updatedPostList = [action.payload, ...currentPostList];
  } else if (action.type === "FETCH_POSTS") {
    updatedPostList = action.payload.posts;
  }
  return updatedPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, postListDispatcher] = useReducer(postListReducer, []);
  const addPost = (post) => {
    postListDispatcher({
      type: "CREATE_POST",
      payload: post,
    });
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch("https://dummyjson.com/posts", { signal })
      .then((res) => res.json())
      .then((data) => {
        fetchIntialPosts(data.posts);
      });
    return () => {
      controller.abort();
    };
  }, []);

  const deletePost = (postId) => {
    postListDispatcher({
      type: "DELETE_POST",
      payload: {
        id: postId,
      },
    });
  };

  const fetchIntialPosts = (posts) => {
    postListDispatcher({
      type: "FETCH_POSTS",
      payload: {
        posts: posts,
      },
    });
  };
  return (
    <PostListContext.Provider value={{ postList, addPost, deletePost }}>
      {children}
    </PostListContext.Provider>
  );
};
export default PostListProvider;
