import React, { FunctionComponent } from "react";

import "./Blog.css";

import Posts from "./Posts/Posts";
import { Route, NavLink } from "react-router-dom";
import NewPost from "./NewPost/NewPost";

const Blog: FunctionComponent = () => {
  return (
    <div className="Blog">
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to="/" exact>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/posts/new" exact>
                New Post
              </NavLink>
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
