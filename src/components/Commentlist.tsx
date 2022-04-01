import React from "react";
type Comment = {
  name: string;
  comments: {
    username: string;
    text: string;
  };
};
type Propscomment = {
  comments: Comment[];
};
const CommentsList = (props: Propscomment) => {
  return (
    <>
      <h3 className="sm:text-2xl text-xl font-bold mt-6 mb-6 text-gray-900">
        Comments :
      </h3>
      {props.comments.map((comment, index) => (
        <div key={index}>
          <h4 className="text-xl font-bold">{comment.comments.username}</h4>
          <p className="mt-1 mb-4">{comment.comments.text}</p>
        </div>
      ))}
    </>
  );
};

export default CommentsList;
