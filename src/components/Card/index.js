const Card = (props) => {
    const { src } = props
    return(<div className="card" style={{ width: "18rem"}}>
        <div >
            <img src={`https://picsum.photos/id/${src}/200/200`} className="card-img-top" alt="..." />
        </div>
    </div>)
 
}
export default Card;