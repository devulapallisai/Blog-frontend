import React, { useEffect, useState } from "react";
import Articles from "../components/Articles";
import styles from "../css/loader.module.css";
type Mytype = {
  name: string;
  title: string;
  text: string;
  image: string;
  date: string;
  tags: string[];
};
function Articlelist() {
  const [articles, setarticles] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/posts").then((res) =>
      res.json().then((re) => setarticles(re.posts))
    );
  }, []);
  return (
    <div className="mb-24">
      <h1 className="sm:text-4xl text-2xl font-bold mb-6 mt-10 text-gray-900">
        Articles
      </h1>
      <div className="container py-4 mx-auto">
        <div className="flex flex-wrap -m-4">
          {articles.length ? (
            <Articles articles={articles} />
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
      </div>
    </div>
  );
}

export default Articlelist;
