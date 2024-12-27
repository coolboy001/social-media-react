import { useContext } from "react";
import { useRef } from "react";
import { PostListContext } from "../store/post-list-store";

const CreatePost = () => {
  const { addPost } = useContext(PostListContext);

  const userIdElement = useRef();
  const postTitleElm = useRef();
  const postBodyElm = useRef();
  const reactionsElm = useRef();
  const tagsElm = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    addPost(
      userIdElement.current.value,
      postTitleElm.current.value,
      postBodyElm.current.value,
      reactionsElm.current.value,
      tagsElm.current.value.split(" ")
    );
    userIdElement.current.value = "";
    postTitleElm.current.value = "";
    postBodyElm.current.value = "";
    reactionsElm.current.value = "";
    tagsElm.current.value = "";
  };
  return (
    <form className='create-post' onSubmit={handleSubmit}>
      <div className='mb-3'>
        <label htmlFor='userId' className='form-label'>
          User Id
        </label>
        <input
          type='text'
          ref={userIdElement}
          className='form-control'
          id='userId'
          placeholder='Enter your userId Here'
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='title' className='form-label'>
          Post Title
        </label>
        <input
          type='text'
          ref={postTitleElm}
          className='form-control'
          id='title'
          placeholder='How are you feeling Today?'
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='content' className='form-label'>
          Post Content
        </label>
        <textarea
          ref={postBodyElm}
          className='form-control'
          id='title'
          placeholder='How are you feeling Today?'
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='reactions' className='form-label'>
          Number of Reactions
        </label>
        <input
          type='text'
          ref={reactionsElm}
          className='form-control'
          id='reactions'
          placeholder='How many pepole reacted to this post'
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='tags' className='form-label'>
          Enter your HashTag Here
        </label>
        <input
          type='text'
          ref={tagsElm}
          className='form-control'
          id='tags'
          placeholder='Please enter Tag using space'
        />
      </div>
      <button type='submit' className='btn btn-primary'>
        Post
      </button>
    </form>
  );
};
export default CreatePost;
