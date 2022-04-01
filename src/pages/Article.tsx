import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Notfound from "./404";
import { Link } from "react-router-dom";
import styles from "../css/loader.module.css";
import sorry from "../images/sorry.webp";
import Articles from "../components/Articles";
import CommentList from "../components/Commentlist";
import AddCommentForm from "../components/Addcomment";
type Mytype = {
  name: string;
  title: string;
  text: string;
  image: string;
  date: string;
  tags: string[];
};
type comment = {
  name: string;
  comments: {
    username: string;
    text: string;
  };
};
function Article() {
  const colors = ["blue", "red", "green"];
  // const name = match.params.name;

  const [articles, setarticles] = useState<Mytype[]>([]);
  const [comments, setcomments] = useState<comment[]>([]);
  const name = useParams().name;
  const article: Mytype | undefined = articles.find(
    (article) => article.name === name
  );
  const otherarticles: Mytype[] | undefined = articles.filter((articlee) => {
    if (article?.tags) {
      for (let i = 0; i < article.tags.length; i++) {
        if (
          articlee.tags.includes(article.tags[i]) &&
          articlee.name !== article.name
        ) {
          return true;
        }
      }
      return false;
    }
    return false;
  });
  type article = {
    comments: String[];
  };
  useEffect(() => {
    fetch("http://localhost:5000/posts").then((res) =>
      res.json().then((re) => setarticles(re.posts))
    );
  }, []);
  useEffect(() => {
    fetch(`http://localhost:5000/${article?.name}/comments`).then((res) =>
      res.json().then((re) => setcomments(re.comments))
    );
  });
  const [articleinfo, setarticleinfo] = useState<article>({ comments: [] });
  return (
    <div className="mb-20">
      {articles.length ? (
        article ? (
          <>
            <h1 className="sm:text-4xl text-2xl font-bold my-6 text-gray-900">
              {article.name}
            </h1>
            <p className="text-base mx-auto leading-relaxed mb-4">
              {article.text}
            </p>
            <hr />
            {name && (
              <AddCommentForm
                articleName={name}
                setArticleInfo={setarticleinfo}
              />
            )}
            <hr />
            {comments.length ? (
              <CommentList comments={comments} />
            ) : (
              <h2 className="font-heading text-xl py-4 text-center font-semibold">
                No comments until now..
              </h2>
            )}
            <hr />
            <h1 className="sm:text-4xl text-2xl font-bold my-6 text-gray-900">
              Related Articles
            </h1>
            <div className="flex flex-wrap -m-4">
              {otherarticles.length ? (
                <Articles articles={otherarticles} />
              ) : (
                <p className="mx-auto font-[Arvo] leading-relaxed mb-1 md:text-xl text-lg pt-4">
                  {/* <br></br> */}
                  Sorry No articles found related to this.
                  <br />
                  <img
                    src={sorry}
                    alt="Sorry"
                    className="mt-3"
                    style={{ maxWidth: 400, minWidth: 250 }}
                  />
                </p>
              )}
            </div>
          </>
        ) : (
          <Notfound />
        )
      ) : (
        <>
          <div className="flex mx-auto py-10">
            <div
              className={`bg-blue-600 p-2  w-4 h-4 rounded-full animate-bounce ${styles.blueCircle}`}
            ></div>
            <div
              className={`bg-green-600 p-2  w-4 h-4 rounded-full animate-bounce ${styles.greenCircle}`}
            ></div>
            <div
              className={`bg-red-600 p-2  w-4 h-4 rounded-full animate-bounce ${styles.redCircle}`}
            ></div>
          </div>
        </>
      )}
    </div>
  );
}

export default Article;
