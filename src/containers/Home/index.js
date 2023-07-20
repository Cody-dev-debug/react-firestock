import { useState } from "react";

import { ListItems, UploadForm } from "../../components";
import { SET_COLLAPSED, SET_ERROR, SET_LOADING } from "../../constants";
import { useGlobalContext } from "../../context";
import { Firestore, Storage } from "../../handlers";

const { writeDocs } = Firestore;
const { uploadFile, downloadFile } = Storage;

const Home = () => {
  const { state, dispatch } = useGlobalContext();
  const [input, setInput] = useState({ title: "", file: null, path: "" });

  const toggle = () =>
    dispatch({
      type: SET_COLLAPSED,
      payload: !state.isCollapsed,
    });

  const handleOnChange = (e) => {
    e.preventDefault();

    if (e.target.name === "file") {
      if (e.target.files.length > 0)
        setInput({
          ...input,
          file: e.target.files[0],
          path: URL.createObjectURL(e.target.files[0]),
        });
      else setInput({ ...input, file: null, path: null });
    } else {
      setInput({ ...input, title: e.target.value });
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!state.isLoggedIn) {
      dispatch({ type: SET_ERROR, payload: { error: "Please Login First" } });
      console.error("Please Login First");
      return;
    }
    const username = state.currentUser?.displayName
      ?.split(" ")
      .map((s) => s.toLowerCase())
      .join("");

    uploadFile(input, "stocks", () => {
      toggle();
      dispatch({ type: SET_LOADING, payload: true });
    })
      .then(downloadFile)
      .then((url) => {
        writeDocs({ ...input, path: url, user: username }, "stocks")
          .then(() => {
            setInput({ title: "", file: null, path: "" });
          })
          .catch((error) => dispatch({ type: SET_ERROR, payload: { error } }));
      })
      .catch((error) => dispatch({ type: SET_ERROR, payload: { error } }));
  };
  return (
    <div className="home">
      <div className="container text-center mt-5">
        <button
          className={
            state.isCollapsed
              ? "btn btn-success float-end"
              : "btn btn-danger float-end"
          }
          onClick={toggle}
        >
          {state.isCollapsed ? "Add Image" : "Close"}
        </button>
        <div className="mb-1 clearfix"></div>
        <UploadForm
          onChange={handleOnChange}
          onSubmit={handleOnSubmit}
          input={input}
        />
        <h1>Gallery</h1>
        <ListItems />
      </div>
    </div>
  );
};

export default Home;
