import { collection, doc, getDocs, serverTimestamp, setDoc, onSnapshot  } from "firebase/firestore"
import { db } from "../lib/firebase.config"

const Firestore = {
    updateDocs : (read) => {
        try {
            console.log("Snapshotting")
            return onSnapshot(collection(db, "stocks"), () => {
                console.log("Updating")
                read();
            })
        } catch (e) {
            console.error("🚀 ~ file: firestore.js:9 ~ e:", e)
        }
    },
    writeDocs : (...args) => {
        const [inputs,collection_name] = args
        return new Promise(async resolve => {
            try {
                const inputObj = { title: inputs.title, path: inputs.path,createdAt : serverTimestamp()}
                await setDoc( doc(collection(db,collection_name)),inputObj)
                resolve("New Stock added")
            } catch (e) {
                console.error("🚀 ~ file: firestore.js:13 ~ e:", e)
            }
        })
    },
    readDocs : (...args) => {
        const [collection_name] = args
        let docs = []
        return new Promise(async resolve => {
            try {
                const colRef = collection(db, collection_name);
                const colSnap = await getDocs(colRef);
                colSnap.forEach( doc => {
                    const d = {...doc.data()}
                    docs.push(d);
                })
                resolve(docs)
            } catch (e) {
                console.error("🚀 ~ file: firestore.js:26 ~ e:", e)
            }
                
        })
    }
}

export default Firestore;