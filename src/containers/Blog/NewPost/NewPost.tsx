import React, { useState, FormEvent, FunctionComponent } from "react";
import axios from "../../../axios";

import "./NewPost.css";
import { RouteComponentProps } from "react-router-dom";

const NewPost: FunctionComponent<RouteComponentProps> = props => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("Max");

  const postDataHandler = (event: FormEvent) => {
    event.preventDefault();
    const post = {
      title: title,
      body: content,
      author: author
    };
    axios
      .post("/posts", post)
      .then(() => props.history.push("/posts"))
      .catch(console.error);
  };

  return (
    <form className="NewPost" onSubmit={postDataHandler}>
      <h1>Add a Post</h1>
      <label>Title</label>
      <input
        type="text"
        value={title}
        onChange={event => setTitle(event.target.value)}
      />
      <label>Content</label>
      <textarea
        rows={4}
        value={content}
        onChange={event => setContent(event.target.value)}
      />
      <label>Author</label>
      <select value={author} onChange={event => setAuthor(event.target.value)}>
        <option value="Max">Max</option>
        <option value="Manu">Manu</option>
      </select>
      <input type="submit" value="Add Post" />
    </form>
  );
};

export default NewPost;
