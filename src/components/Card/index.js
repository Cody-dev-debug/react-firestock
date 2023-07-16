import { useMemo } from "react";

const Card = (props) => {
    const { file:{ path, title, createdAt} , username = "Aditya" } = props
    const timestamp = useMemo(() => {
        const date = `${new Date(createdAt.seconds*1000)}`.split(" ")
        return `${date[1]} ${date[2]} ${date[3]}`;
    },[])
    return(
        <div className="card" style={{ width: "18rem"}} >
            <div style={{
                height: "220px",
                backgroundImage : `url(${path})`,
                backgroundSize : "cover",
                backgroundRepeat : "no-repeat",
            }}></div>
            <div className="text-center mt-1">{title}</div>
            <div className="d-flex justify-content-between px-2 my-1">
                <span>{timestamp}</span>
                <span>{username}</span>
            </div>
        </div>
    )
 
}
export default Card;