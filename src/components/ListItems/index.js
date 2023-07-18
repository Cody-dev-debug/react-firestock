import { useContext } from "react"
import { Context } from '../../context';
import Card from "./Card";

const ListItems = (props) => {
    let { filter } = props;
    if(!filter) {
        filter = () => true
    }
    const {state} =useContext(Context)
    return (
        <div className="row row-gap-5">
            {state.items.filter(filter).sort((a, b) => (a.title > b.title ? 1 : 1)).map((item,idx) => (
                <div key={idx+1} className="col mt-2 d-flex justify-content-center">
                    <Card file={item} />
                </div>
            ))}
        </div>
    )
}
export default ListItems;