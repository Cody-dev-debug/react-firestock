import './styles.css';
import { Card, Navbar, UploadForm } from '../components';
import { useContext, useEffect, useState } from 'react';
import { SET_COLLAPSED } from '../constants';
import { Context } from '../context';
import Firestore from '../handlers/firestore';
import Storage from '../handlers/storage';

const { writeDocs, updateDocs } = Firestore
const { uploadFile,downloadFile } = Storage

const App = () => {
  const {state, dispatch,read}= useContext(Context);
  const [input,setInput] = useState({ title:null, file:null, path:null });

  useEffect(() => {
    updateDocs(read);
  },[])

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

    uploadFile(input,"stocks")
      .then(downloadFile)
      .then(url => {
        toggle()
        writeDocs({ ...input, path: url},"stocks").then(() =>{
          setInput({ title:null, file:null, path:null })
        })
      })
  }

  return (
    <div className="App">
      <Navbar/>
      <div className="container text-center mt-5">
        <button className={state.isCollapsed? 'btn btn-success float-end': 'btn btn-danger float-end'} onClick={toggle}>{state.isCollapsed ? "Add Image" : "Close"}</button>
        <div className='mb-1 clearfix'></div>
        <UploadForm
          onChange={handleOnChange}
          onSubmit={handleOnSubmit}
          input={input}
        />
        <h1>Gallery</h1>
        <div className="row row-gap-5">
          {state.items.map((item,idx) => (
            <div key={idx+1} className="col mt-2 d-flex justify-content-center">
              <Card file={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
