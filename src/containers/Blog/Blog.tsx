import React, { FunctionComponent } from "react";

import "./Blog.css";

import Posts from "./Posts/Posts";
import { Route, NavLink, Switch } from "react-router-dom";
import NewPost from "./NewPost/NewPost";
import FullPost from "./FullPost/FullPost";

const Blog: FunctionComponent = () => {
  return (
    <div className="Blog">
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to="/" exact>
                Posts
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
      <Switch>
        <Route path="/" exact component={Posts} />
        <Route path="/posts/new" exact component={NewPost} />
        <Route path="/posts/:id" exact component={FullPost} />
      </Switch>
    </div>
  );
};

export default Blog;
