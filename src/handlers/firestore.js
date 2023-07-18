import {
  collection,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../lib/firebase.config";

const Firestore = {
  updateDocs: (read, setLoading) => {
    try {
      return onSnapshot(collection(db, "stocks"), () => {
        setLoading();
        read();
      });
    } catch (e) {
      console.error("🚀 ~ file: firestore.js:9 ~ e:", e);
    }
  },
  writeDocs: (...args) => {
    const [inputs, collection_name] = args;
    const { title, path, user } = inputs;
    return new Promise(async (resolve) => {
      try {
        const inputObj = { title, path, user, createdAt: serverTimestamp() };
        await setDoc(doc(collection(db, collection_name)), inputObj);
        resolve("New Stock added");
      } catch (e) {
        console.error("🚀 ~ file: firestore.js:13 ~ e:", e);
      }
    });
  },
  readDocs: (...args) => {
    const [collection_name] = args;
    let docs = [];
    return new Promise(async (resolve) => {
      try {
        const colRef = collection(db, collection_name);
        const colSnap = await getDocs(colRef);
        colSnap.forEach((doc) => {
          const d = { ...doc.data(), id: doc.id };
          docs.push(d);
        });
        resolve(docs);
      } catch (e) {
        console.error("🚀 ~ file: firestore.js:26 ~ e:", e);
      }
    });
  },
};

export default Firestore;
