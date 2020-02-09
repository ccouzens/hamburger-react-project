import React, { FunctionComponent } from "react";

import "./Post.css";

const Post: FunctionComponent<{
  title: string;
  author: string;
  clicked: () => void;
}> = props => (
  <article className="Post" onClick={props.clicked}>
    <h1>{props.title}</h1>
    <div className="Info">
      <div className="Author">{props.author}</div>
    </div>
  </article>
);

export default Post;
