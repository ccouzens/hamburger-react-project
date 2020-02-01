import React, { useEffect, useState } from "react";
import axios from "axios";

import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";

interface Post {
  id: number;
  title: string;
  author: string;
}

const Blog = (props: {}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [errored, setErrored] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | undefined>();

  useEffect(() => {
    const canceller = axios.CancelToken.source();
    axios
      .get<{ id: number; title: string }[]>(
        "https://jsonplaceholder.typicode.com/posts",
        {
          cancelToken: canceller.token
        }
      )
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
              key={post.id}
              title={post.title}
              author={post.author}
              clicked={() => setSelectedPostId(post.id)}
            />
          ))
        )}
      </section>
      <section>
        <FullPost id={selectedPostId} />
      </section>
      <section>
        <NewPost />
      </section>
    </div>
  );
};

export default Blog;
