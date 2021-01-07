import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Style from "./Article.module.css";
import Blogheader from "../../components/blogheader/index";
import ReactMarkdown from "react-markdown";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { API } from "../../backend";

const Article = () => {
  const [article, setArticle] = useState({
    title: "",
    description: "",
    markdown: "",
  });

  const { title, description, markdown } = article;
  const { postId } = useParams();

  useEffect(() => {
    getPostById();
  }, []);
  const getPostById = (post) => {
    return fetch(`${API}/api/post/${postId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setArticle({
          ...article,
          title: data.title,
          description: data.description,
          markdown: data.markdown,
        });
      })

      .catch((err) => console.log(err));
  };

  const Markdown = () => {
    if (article.markdown === undefined) {
      return (
        <SkeletonTheme color="#161f27" highlightColor="#324759">
          <Skeleton count={15} />
        </SkeletonTheme>
      );
    } else {
      return <ReactMarkdown className={Style.markdown} source={markdown} />;
    }
  };

  return (
    <div className={Style.article}>
      <div className={Style.controlHeader}>
        <Blogheader
          title={title}
          description={description}
          createdAt={article.createdAt}
        />
        {/* {editDeleteArticle(article._id)} */}
      </div>
      <hr />
      {Markdown()}
    </div>
  );
};

export default Article;
