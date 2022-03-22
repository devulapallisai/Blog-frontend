import React from "react";
import { useParams } from "react-router-dom";
import articles from "../components/Articl-content";
function Article() {
  // const name = match.params.name;
  const name = useParams().name;
  const article = articles.find((article) => article.name === name);
  return (
    <div className="mb-20">
      {article ? (
        <>
          <h1 className="sm:text-4xl text-2xl font-bold my-6 text-gray-900">
            {article.name}
          </h1>
          {article.content.map((paragraph, index) => (
            <p className="text-base mx-auto leading-relaxed mb-4" key={index}>
              {paragraph}
            </p>
          ))}
        </>
      ) : (
        <h1 className="text-center font-bold text-red-600 md:text-4xl sm:text-3xl text-xl">
          Article doesn't exists now. Try Again later
        </h1>
      )}
    </div>
  );
}

export default Article;
