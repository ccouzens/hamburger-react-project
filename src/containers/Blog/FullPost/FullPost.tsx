import React, { useEffect, useState, FunctionComponent } from "react";
import axios from "axios";
import axiosInstance from "../../../axios";

import "./FullPost.css";
import { RouteComponentProps } from "react-router-dom";

const deletePostHandler = (id: number) => {
  axiosInstance
    .delete(`/posts/${id}`)
    .then(console.log)
    .catch(console.error);
};

const FullPost: FunctionComponent<RouteComponentProps<{
  id: string;
}>> = props => {
  const [post, setPost] = useState<
    undefined | { title: string; body: string; id: number }
  >();

  useEffect(() => {
    const canceller = axios.CancelToken.source();
    axiosInstance
      .get<{ body: string; title: string; id: number }>(
        `/posts/${encodeURIComponent(props.match.params.id)}`,
        {
          cancelToken: canceller.token
        }
      )
      .then(r => setPost(r.data))
      .catch(console.error);
    return function cleanup() {
      canceller.cancel("cancel loading post");
    };
  }, [props.match.params.id]);

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
