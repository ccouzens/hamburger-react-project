import React, { FunctionComponent } from "react";

import "./Blog.css";

import Posts from "./Posts/Posts";
import { Route, Link } from "react-router-dom";
import NewPost from "./NewPost/NewPost";

const Blog: FunctionComponent = () => {
  return (
    <div className="Blog">
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/posts/new">New Post</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Route path="/" exact component={Posts} />
      <Route path="/posts/new" exact component={NewPost} />
    </div>
  );
};

export default Blog;
