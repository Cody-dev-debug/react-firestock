import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";

import { useGlobalContext } from "../../context";
import { SET_LOADING, SET_USER } from "../../constants";
import { Authenticate, Firestore } from "../../handlers";
import { Navbar } from "../../components";
import { Home, Image, MyStocks, NotFound, Profile } from "../../containers";

const { currentUser } = Authenticate;
const { updateDocs } = Firestore;

const App = () => {
  const { state, dispatch, read } = useGlobalContext();

  useEffect(() => {
    currentUser((user) => dispatch({ type: SET_USER, payload: { user } }));
    updateDocs(() => dispatch({ type: SET_LOADING, payload: true }), read);
  }, []);

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {state.isLoggedIn ? (
            <Route path="/my-stocks" element={<MyStocks />} />
          ) : null}
          <Route path="/images/:id" element={<Image />} />
          <Route path="/:name/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
