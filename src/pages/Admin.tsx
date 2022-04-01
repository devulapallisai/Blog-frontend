import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../App";
import { useNavigate } from "react-router-dom";
function Admin() {
  const { user, handlelogin, logout } = useContext(userContext);
  const [name, setname] = useState("");
  const [admin, setadmin] = useState("");
  const [title, settitle] = useState("");
  const [tags, settags] = useState("");
  const [text, settext] = useState("");
  const [date, setdate] = useState("");
  const [thumbnail, setthumbnail] = useState<File | null>(null);
  const [admins, setadmins] = useState<Array<String>>([]);
  const history = useNavigate();
  useEffect(() => {
    if (!user) {
      history("/login");
    } else {
      fetch("https://blogproject2022.herokuapp.com/admins").then((res) =>
        res.json().then((re) => {
          setadmins(re);
        })
      );
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fileReader = new FileReader();
    // let img;
    let img;
    if (thumbnail) {
      fileReader.readAsDataURL(thumbnail);

      fileReader.onload = () => {
        // resolve(fileReader.result);
        img = fileReader.result;
        if (img) {
          // console.log("first");
          fetch("https://blogproject2022.herokuapp.com/add-post", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              name: name,
              title: title,
              text: text,
              img: img,
              tags: tags,
              date: date,
            }),
          })
            .then((res) => {
              console.log(res);
              setname("");
              settext("");
              setdate("");
              settags("");
              setthumbnail(null);
              settitle("");
            })
            .catch((err) => console.log(err));
        }
      };
    }
  };
  const addadmin = () => {
    fetch("https://blogproject2022.herokuapp.com/add-admin", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        admin: admin,
      }),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((re) => {
          alert(re.title);
          setadmin("");
        });
      }
    });
  };
  const removeadmin = () => {
    fetch("https://blogproject2022.herokuapp.com/delete-admin", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        admin: admin,
      }),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((re) => {
          alert(re.title);
          setadmin("");
        });
      }
    });
  };
  return (
    <div className="mt-14 md:mt-0">
      <div className="text-center py-2">Hello {user}</div>
      <div className="flex justify-center">
        <button
          className="bg-transparent hover:bg-green-500 text-green-700 font-semibold 
          hover:text-white py-2 px-4 border border-green-500 
          hover:border-transparent 
          rounded"
          onClick={logout}
        >
          Logout
        </button>
      </div>
      <br />
      <hr />
      <br />
      {/* <h2 className="font-heading text-center text-black-600 font-bold text-xl md:text-3xl">
        To add new post please fill this form
      </h2>
      <br /> */}
      <div className="max-w-screen-md mx-auto p-2">
        <div className="text-center mb-16">
          <p className="mt-4 text-sm leading-7 text-gray-500 font-regular uppercase">
            Add posts?
          </p>
          <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
            Fill this <span className="text-indigo-600">Form</span>
          </h3>
        </div>

        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Name of Article
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                onChange={(e) => setname(e.target.value)}
                placeholder="Doe"
                value={name}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Title of Article
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                onChange={(e) => settitle(e.target.value)}
                placeholder="Doe"
                value={title}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Tags
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                onChange={(e) => settags(e.target.value)}
                placeholder="tags seperated by commas  eg: react,express"
                value={tags}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Date
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="Date"
                onChange={(e) => setdate(e.target.value)}
                placeholder="27/11/2003"
                value={date}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Content
              </label>
              <textarea
                rows={10}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                value={text}
                onChange={(e) => settext(e.target.value)}
              ></textarea>
            </div>
            <div className="flex justify-center">
              <input
                type="file"
                className="appearance-none block w-full py-3 px-4 mb-3  focus:outline-none"
                name="photo"
                // accept="image/png"
                id="photo"
                // value={thumbnail}
                onChange={(e) =>
                  setthumbnail(e.target.files ? e.target.files[0] : null)
                }
              />
            </div>
            <div className="flex justify-between w-full px-3">
              <button
                className="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
        {/* Adding or removing admin */}
        <br />
        <hr />
        <br />
        <h3 className="text-center p-4 text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
          All <span className="text-indigo-600">Admins</span>
        </h3>
        <div className="flex flex-col overflow-x-hidden pb-4">
          {admins.map((item, index) => (
            <h3
              key={index}
              className="text-center p-1 text-lg sm:text-xl leading-normal tracking-tight text-green-700"
            >
              {item}
            </h3>
          ))}
        </div>
        <h3 className="text-center p-4 text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
          Add | Remove <span className="text-indigo-600">Admin</span>
        </h3>
        <div className="flex w-full justify-center">
          <div className="flex items-center border-b border-teal-500 py-2">
            <input
              className="sm:w-[400px] w-[200px] appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="johndoe@gmail.com"
              aria-label="Full name"
              value={admin}
              onChange={(e) => setadmin(e.target.value)}
            />
            <br />
            <button
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
              type="button"
              onClick={addadmin}
            >
              Add
            </button>
            <button
              className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
              type="button"
              onClick={removeadmin}
            >
              Remove
            </button>
          </div>
        </div>
        <br />
      </div>
    </div>
  );
}

export default Admin;
