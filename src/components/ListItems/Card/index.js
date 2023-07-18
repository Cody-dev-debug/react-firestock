import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
  const {
    file: { path, title, createdAt, user, id },
  } = props;
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate(`/images/${id}`, { state: { id } });
  };

  const timestamp = useMemo(() => {
    try {
      const date = `${new Date(createdAt.seconds * 1000)}`.split(" ");
      return `${date[1]} ${date[2]} ${date[3]}`;
    } catch (e) {}
  }, [createdAt]);

  if (!createdAt) return;
  return (
    <div className="card" style={{ width: "18rem" }} onClick={handleOnClick}>
      <div
        style={{
          height: "220px",
          backgroundImage: `url(${path})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="text-center mt-1 text-capitalize">{title}</div>
      <div className="d-flex justify-content-between px-2 my-1">
        <span>{timestamp}</span>
        <span>{`@${user}`}</span>
      </div>
    </div>
  );
};
export default Card;
