import { ListItems } from "../../components";
import { useGlobalContext } from "../../context";

const MyStocks = () => {
  const { state } = useGlobalContext();

  const userFilter = (obj) =>
    obj.user ===
    state.currentUser?.displayName?.split(" ")?.join("")?.toLowerCase();

  return (
    <div className="my-stocks">
      <div className="container text-center mt-5">
        <h1>Your Gallery</h1>
        <ListItems filter={userFilter} />
      </div>
    </div>
  );
};

export default MyStocks;
