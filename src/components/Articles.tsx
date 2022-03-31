import React from "react";
import { Link } from "react-router-dom";
type MyType = {
  name: string;
  title: string;
  text: string;
  image: string;
  date: string;
  tags: string[];
};
type Approps = {
  articles: MyType[];
};
const Articles = (props: Approps) => {
  const colors = ["blue", "red", "green"];
  const articles = props.articles.sort((a, b) => {
    if (a.date < b.date) return 1;
    return -1;
  });
  return (
    <>
      {articles.map((article: MyType, index: number) => (
        <div key={index} className="p-4 md:w-1/2">
          <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
            <Link to={`/article/${article.name}`}>
              <img
                className="lg:h-48 md:h-36 w-full object-cover object-center"
                src={article.image}
                alt="blog"
              />
            </Link>
            <div className="p-6">
              <Link key={index} to={`/article/${article.name}`}>
                <h3 className="title-font text-lg font-medium text-gary-900 mb-3">
                  {article.title}
                </h3>
              </Link>
              <p className="leading-relaxed mb-3">
                {article.text.substring(0, 115)}...
              </p>
              <div className="flex item-center flex-wrap">
                <Link
                  className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
                  to={`/article/${article.name}`}
                >
                  Learn more...
                </Link>
              </div>
              {article.tags.map((item, index) => (
                <div
                  className={`mt-2 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 mx-1 py-1 bg-${
                    colors[index % 4]
                  }-200 text-white 
                rounded-full`}
                  key={index}
                  style={{ background: colors[index % 4] }}
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="text-center mb-2">
              Published on - {article.date}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Articles;
