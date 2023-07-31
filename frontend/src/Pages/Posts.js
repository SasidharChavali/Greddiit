import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "./State";
import Post from "./Post";

const PostsWidget = ({ postedIn
}) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPost = async () => {
    const response = await fetch(`http://localhost:3001/api/posts/${postedIn}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
      getPost();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.map(
        ({
          _id,
          postedBy,
          text,
          picturePath,
          userPicturePath,
          postedIn,
          upvotes,
          downvotes,
          comments,
        }) => (
          <Post
            key={_id}
            postId={_id}
            postedBy={postedBy}
            text={text}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            postedIn={postedIn}
            upvotes={upvotes}
            downvotes={downvotes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
