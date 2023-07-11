import './styles.css';
import { Card, Navbar } from '../components';

const App = () => {
  const photos =[
    "1001","1002","1003","1004","1005","1006","1009","1008",
  ]
  return (
    <div className="App">
      <Navbar isLoggedIn={true} userName={"Aditya"}/>
      <div className="container text-center mt-5">
        <h1>Gallery</h1>
        <div className="row row-gap-5">
          {photos.map((photo) => (
            <div className="col mt-2 d-flex justify-content-center">
              <Card src={photo} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
