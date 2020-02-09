import React, { FunctionComponent } from "react";

import "./Post.css";

const Post: FunctionComponent<{
  title: string;
  author: string;
}> = props => (
  <article className="Post">
    <h1>{props.title}</h1>
    <div className="Info">
      <div className="Author">{props.author}</div>
    </div>
  </article>
);

export default Post;
