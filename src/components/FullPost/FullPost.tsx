import React, { useEffect, useState } from "react";
import axios from "axios";

import "./FullPost.css";

const deletePostHandler = (id: number) => {
  axios
    .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(console.log)
    .catch(console.error);
};

const FullPost = (props: { id: number | undefined }) => {
  const [post, setPost] = useState<
    undefined | { title: string; body: string; id: number }
  >();

  useEffect(() => {
    if (props.id === undefined) {
      return;
    }
    const canceller = axios.CancelToken.source();
    axios
      .get<{ body: string; title: string; id: number }>(
        `https://jsonplaceholder.typicode.com/posts/${props.id}`,
        {
          cancelToken: canceller.token
        }
      )
      .then(r => setPost(r.data))
      .catch(console.error);
    return function cleanup() {
      canceller.cancel("cancel loading post");
    };
  }, [props.id]);

  if (props.id === undefined) {
    return <p style={{ textAlign: "center" }}>Please select a Post!</p>;
  }
  if (post === undefined) {
    return <p style={{ textAlign: "center" }}>Loading…</p>;
  }
  return (
    <div className="FullPost">
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <div className="Edit">
        <button className="Delete" onClick={() => deletePostHandler(post.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};
export default FullPost;
