import {
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  setPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../lib/firebase.config";

const provider = new GoogleAuthProvider();

const Authenticate = {
  currentUser: (setUser) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  },
  signIn: () => {
    return new Promise((resolve) => {
      setPersistence(auth, browserSessionPersistence).then(() => {
        signInWithPopup(auth, provider)
          .then((response) => {
            resolve(response.user);
          })
          .catch(console.error);
      });
    });
  },
  signOut: () => {
    return new Promise((resolve) => {
      signOut(auth)
        .then(() => {
          console.log("User Logged Out");
          resolve();
        })
        .catch(console.error);
    });
  },
};

export default Authenticate;
