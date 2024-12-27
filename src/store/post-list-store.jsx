import { createContext, useReducer } from "react";

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
  }
  return updatedPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, postListDispatcher] = useReducer(postListReducer, []);
  const addPost = (userId, title, body, reactions, tags) => {
    postListDispatcher({
      type: "CREATE_POST",
      payload: {
        id: Date.now(),
        userId: userId,
        title: title,
        body: body,
        reactions: reactions,
        tags: tags,
      },
    });
  };

  const deletePost = (postId) => {
    console.log(postId);
    postListDispatcher({
      type: "DELETE_POST",
      payload: {
        id: postId,
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