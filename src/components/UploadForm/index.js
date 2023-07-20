import { useMemo } from "react";
import Preview from "./Preview";
import { useGlobalContext } from "../../context";

const UploadForm = (props) => {
  const { input: inputs, onChange, onSubmit } = props;
  const { state } = useGlobalContext();

  const isDisabled = useMemo(() => {
    return !!Object.values(inputs).some((input) => !input);
  }, [inputs]);

  if (state.isCollapsed) return;

  return (
    <>
      <div className="mb-5 d-flex align-items-center justify-content-center flex-column">
        <p className={`display-6 text-center ${inputs.path ? "mb-0" : "mb-3"}`}>
          Upload Stock Image
        </p>
        <div className="d-flex align-items-center justify-content-center flex-row w-75 flex-wrap">
          <Preview path={inputs.path} />
          <div className="d-flex align-items-center justify-content-center flex-column">
            <form className="mb-2 text-start" onSubmit={onSubmit}>
              <input
                type="text"
                className="form-control mb-3"
                name="title"
                placeholder="Title"
                aria-describedby="text"
                value={inputs.title}
                onChange={onChange}
              />
              <input
                type="file"
                className="form-control mb-3"
                name="file"
                onChange={onChange}
              />
              <button
                type="submit"
                className="btn btn-success float-end"
                disabled={isDisabled}
              >
                Upload
              </button>
            </form>
          </div>
        </div>
        {state.error && <div className="error">{state.error}</div>}
      </div>
    </>
  );
};

export default UploadForm;
