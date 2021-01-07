import React, { useEffect, useState } from "react";
import Style from "./Home.module.css";
import Blogheader from "../../components/blogheader/index";
import { useHistory } from "react-router-dom";
import { API } from "../../backend";

const Home = () => {
  let history = useHistory();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch(`${API}/api/post`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => {
        return console.log(err);
      });
  };
  return (
    <div className={Style.home}>
      {posts.map((post) => {
        return (
          <>
            <button
              key={post._id}
              className={Style.button}
              onClick={() => history.push(`/article/${post._id}`)}
            >
              <Blogheader
                title={post.title}
                description={post.description}
                createdAt={post.createdAt}
              />
            </button>
          </>
        );
      })}
    </div>
  );
};

export default Home;
