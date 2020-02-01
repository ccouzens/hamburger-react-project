import React from "react";

import "./Post.css";

const Post = (props: { title: string; author: string }) => (
  <article className="Post">
    <h1>{props.title}</h1>
    <div className="Info">
      <div className="Author">{props.author}</div>
    </div>
  </article>
);

export default Post;
