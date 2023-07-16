import { useContext, useMemo } from "react";
import Preview from "./Preview";
import { Context } from "../../context";

const UploadForm = (props) => {
    const { input:inputs, onChange, onSubmit } = props

    const {state,dispatch} = useContext(Context)
    
    const isDisabled = useMemo(() => {
        return !!Object.values(inputs).some( input => !input )
    },[inputs])

    if (state.isCollapsed) return;

    return (
      <>
        <div className="mb-5 d-flex align-items-center justify-content-center flex-column">
            <p className="display-6 text-center mb-3">Upload Stock Image</p>
            <div className="d-flex align-items-center justify-content-center flex-row w-75">
                <Preview path={inputs.path} />
                <div className="d-flex align-items-center justify-content-center flex-column">
                    <form className="mb-2 text-start" onSubmit={onSubmit}>
                        <input
                            type="text"
                            className="form-control mb-3"
                            name="title"
                            placeholder="Title"
                            aria-describedby="text"
                            onChange={onChange}
                        />
                        <input 
                            type="file" 
                            className="form-control mb-3" 
                            name="file"
                            onChange={onChange}
                        />
                        <button type="submit" className="btn btn-success float-end" disabled={isDisabled}>Save changes</button>
                    </form>
                </div>
            </div>
        </div>
      </>
    );
  };

export default UploadForm;