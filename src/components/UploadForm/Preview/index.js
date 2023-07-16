const Preview = (props) => {
    const { path } = props
    return (
      path && <div
        className="rounded m-5"
        style={{
          width: "30%",
          height: "300px",
          backgroundImage: `url(${path}`,
          backgroundSize: "cover",
        }}
      ></div>
    );
  };

export default Preview;