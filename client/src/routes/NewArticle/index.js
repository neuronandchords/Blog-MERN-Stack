import React, { useState } from "react";
import Style from "./NewArticle.module.css";
import { isAuthenticated } from "../helper/apicalls";
import { newArticle } from "./helper/apicall";
import { Redirect } from "react-router-dom";

const NewArticle = () => {
  const [post, setPost] = useState({
    title: "",
    description: "",
    markdown: "",
    user: "",
    redirect: false,
  });
  const {
    user: { _id },
    token,
  } = isAuthenticated();

  const { title, description, markdown, user, redirect } = post;
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError("");
    setPost({
      ...post,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    console.log(_id, token);

    newArticle(_id, token, { title, description, markdown, user: _id })
      .then((data) => {
        console.log(data);
        if (data.error) {
          setError(true);
        } else {
          setError("");
          setPost({ title: "", description: "", markdown: "", redirect: true });
        }
      })
      .catch((err) => console.log(err));
  };
  const performRedirect = () => {
    if (redirect) {
      if (isAuthenticated()) {
        return <Redirect to="/"></Redirect>;
      }
    }
  };
  return (
    <form className={Style.form}>
      {/* <input type="text" required placeholder="Url image layout" name="image" /> */}
      <input
        type="text"
        required
        placeholder="Title"
        value={post.title}
        name="title"
        onChange={handleChange}
      />
      <input
        type="text"
        required
        placeholder="Description"
        value={post.description}
        name="description"
        onChange={handleChange}
      />
      <textarea
        required
        placeholder="Markdown here"
        value={post.markdown}
        name="markdown"
        onChange={handleChange}
      />
      <div>
        <button>Back</button>
        <button onClick={onSubmit} type="submit">
          create
        </button>
      </div>
      {performRedirect()}
    </form>
  );
};

export default NewArticle;
