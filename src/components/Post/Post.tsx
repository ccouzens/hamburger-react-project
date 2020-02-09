import React, { FunctionComponent } from "react";

import "./Post.css";
import { Link } from "react-router-dom";

const Post: FunctionComponent<{
  title: string;
  author: string;
  id: number;
}> = props => (
  <Link to={`/posts/${props.id}`} className="Post">
    <article>
      <h1>{props.title}</h1>
      <div className="Info">
        <div className="Author">{props.author}</div>
      </div>
    </article>
  </Link>
);

export default Post;
