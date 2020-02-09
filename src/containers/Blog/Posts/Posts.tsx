import React, { FunctionComponent, useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../../../axios";

import Post from "../../../components/Post/Post";

import "./Posts.css";

interface PostType {
  id: number;
  title: string;
  author: string;
}

const Posts: FunctionComponent = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [errored, setErrored] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | undefined>();

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
    <section className="Posts">
      {errored ? (
        <p style={{ textAlign: "center" }}>Something went wrong!</p>
      ) : (
        posts.map(post => (
          <Post
            key={post.id}
            title={post.title}
            author={post.author}
            clicked={() => setSelectedPostId(post.id)}
          />
        ))
      )}
    </section>
  );
};

export default Posts;
