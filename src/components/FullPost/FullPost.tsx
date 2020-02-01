import React from "react";

import "./FullPost.css";

const FullPost = (props: { id: number | undefined }) =>
  props.id === undefined ? (
    <p style={{ textAlign: "center" }}>Please select a Post!</p>
  ) : (
    <div className="FullPost">
      <h1>Title</h1>
      <p>Content</p>
      <div className="Edit">
        <button className="Delete">Delete</button>
      </div>
    </div>
  );

export default FullPost;
