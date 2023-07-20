import { useGlobalContext } from "../../context";
import Card from "./Card";
import { Loader } from "../../components";

const ListItems = (props) => {
  let { userFilter } = props;

  const { state } = useGlobalContext();

  if (!userFilter) {
    userFilter = () => true;
  }
  return (
    <Loader loading={state.loading} error={state.error}>
      <div className="row row-gap-5">
        {state.items
          .filter((obj) => userFilter(obj) && obj.title.includes(state.search))
          .sort((a, b) => (a.title > b.title ? 1 : -1))
          .map((item, idx) => (
            <div
              key={idx + 1}
              className="col mt-2 d-flex justify-content-center"
            >
              <Card file={item} />
            </div>
          ))}
      </div>
    </Loader>
  );
};
export default ListItems;
