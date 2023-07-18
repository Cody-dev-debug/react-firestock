import { useContext } from "react";

import { ListItems } from "../../components"
import { Context } from "../../context";

const MyStocks = () => {
    const { state }= useContext(Context);

    const filter = (obj) => {
        if(obj.user === state.currentUser?.displayName?.split(" ").join("").toLowerCase()){
            return true;
        }else
            return false;
    }
    return (
        <div className="my-stocks">
            <div className="container text-center mt-5">
                <h1>Your Gallery</h1>
                <ListItems filter={filter}/>
            </div>
        </div>
    )
}

export default MyStocks;