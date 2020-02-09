import React, { FunctionComponent, useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../../../axios";

import Post from "../../../components/Post/Post";

import "./Posts.css";
import { Route, RouteComponentProps } from "react-router-dom";
import FullPost from "../FullPost/FullPost";

interface PostType {
  id: number;
  title: string;
  author: string;
}

const Posts: FunctionComponent<RouteComponentProps> = props => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    const canceller = axios.CancelToken.source();
    axiosInstance
      .get<{ id: number; title: string }[]>("/posts", {
        cancelToken: canceller.token
      })
      .then(r => {
        const posts = r.data
          .slice(0, 4)
          .map(post => ({ ...post, author: "Max" }));
        setPosts(posts);
      })
      .catch(err => {
        setErrored(true);
        console.error(err);
      });
    return function cleanup() {
      canceller.cancel("cancel loading posts");
    };
  }, []);

  return (
    <div>
      <section className="Posts">
        {errored ? (
          <p style={{ textAlign: "center" }}>Something went wrong!</p>
        ) : (
          posts.map(post => (
            <Post
              title={post.title}
              author={post.author}
              key={post.id}
              id={post.id}
            />
          ))
        )}
      </section>
      <Route path={`${props.match.path}/:id`} exact component={FullPost} />
    </div>
  );
};

export default Posts;
