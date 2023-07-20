const Preview = (props) => {
  const { path } = props;
  return (
    path && (
      <img
        src={path}
        alt=" "
        className="rounded m-4"
        style={{
          height: "300px",
          backgroundSize: "cover",
        }}
      />
    )
  );
};

export default Preview;
