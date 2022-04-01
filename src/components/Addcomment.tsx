import React, { useState, Dispatch } from "react";
type dispatch = {
  comments: String[];
};
const AddCommentForm = ({
  articleName,
  setArticleInfo,
}: {
  articleName: String;
  setArticleInfo: Dispatch<dispatch>;
}) => {
  const [username, setUsername] = useState("");
  const [commentText, setCommentText] = useState("");

  const addComment = async () => {
    const result = await fetch(
      `https://blogproject2022.herokuapp.com/api/articles/${articleName}/add-comments`,
      {
        method: "post",
        body: JSON.stringify({ username, text: commentText }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const body = await result.json();
    setArticleInfo(body);
    setUsername("");
    setCommentText("");
  };

  return (
    <div className="shadow rounded px-8 pt-6 pb-8 mb-4">
      <h3 className="text-xl font-bold mb-4 text-gray-900">Add a Comment</h3>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Name :
      </label>
      <input
        type="text"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {/* <br /> */}
      <label className="block text-gray-700 text-sm font-bold my-2">
        Comment :
      </label>
      <textarea
        rows={4}
        cols={50}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-1"
        onClick={() => addComment()}
      >
        Add Comment
      </button>
    </div>
  );
};

export default AddCommentForm;
