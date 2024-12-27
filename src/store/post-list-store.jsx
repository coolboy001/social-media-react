import { createContext, useReducer } from "react";

export const PostListContext = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
  fetchIntialPosts: () => {},
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
  const addPost = (userId, title, body, views, tags) => {
    postListDispatcher({
      type: "CREATE_POST",
      payload: {
        id: Date.now(),
        userId: userId,
        title: title,
        body: body,
        views: views,
        tags: tags,
      },
    });
  };

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
    <PostListContext.Provider
      value={{ postList, addPost, deletePost, fetchIntialPosts }}
    >
      {children}
    </PostListContext.Provider>
  );
};
export default PostListProvider;
