import React, { FunctionComponent } from "react";

import "./Blog.css";

import Posts from "./Posts/Posts";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import NewPost from "./NewPost/NewPost";

const Blog: FunctionComponent = () => {
  return (
    <div className="Blog">
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to="/posts" exact>
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
        <Route path="/posts/new" exact component={NewPost} />
        <Route path="/posts" component={Posts} />
        <Redirect from="/" to="/posts" />
      </Switch>
    </div>
  );
};

export default Blog;
