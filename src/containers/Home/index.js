import { useContext, useState } from 'react';

import { ListItems, UploadForm } from '../../components';
import { SET_COLLAPSED } from '../../constants';
import { Context } from '../../context';
import { Firestore, Storage } from '../../handlers';

const { writeDocs } = Firestore
const { uploadFile,downloadFile } = Storage


const Home = () => {
  const { state, dispatch }= useContext(Context);
  const [input,setInput] = useState({ title:null, file:null, path:null });

  const toggle = () => 
    dispatch({
      type : SET_COLLAPSED,
      payload : !state.isCollapsed,
    })

  const handleOnChange = (e) => {
    e.preventDefault();

    if (e.target.name === 'file') {
      setInput({ ...input, file:e.target.files[0] , path:URL.createObjectURL(e.target.files[0])})
    } else {
      setInput({ ...input, title:e.target.value})
    }
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!state.isLoggedIn){
      console.error("Please Login First")
    }
    const username = state.currentUser?.displayName?.split(" ").map(s => s.toLowerCase()).join("");

    uploadFile(input,"stocks")
      .then(downloadFile)
      .then(url => {
        toggle()
        writeDocs({ ...input, path: url, user: username},"stocks").then(() =>{
          setInput({ title:null, file:null, path:null })
        })
      })
  }
  return (
    <div className="home">
      
      <div className="container text-center mt-5">
        <button className={state.isCollapsed? 'btn btn-success float-end': 'btn btn-danger float-end'} onClick={toggle}>{state.isCollapsed ? "Add Image" : "Close"}</button>
        <div className='mb-1 clearfix'></div>
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
}

export default Home;
