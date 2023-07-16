import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../lib/firebase.config";

const Storage = {
    uploadFile : (...args) => {
        const [inputs,collection_name] = args
        const metadata = {
            contentType: 'image/jpeg',
          };
        return new Promise(async resolve => {
            try {
                const storageRef = ref(storage, `${collection_name}/${inputs.title}.jpeg`);

                uploadBytes(storageRef, inputs.file, metadata).then((snapshot) => {
                    resolve({ path: snapshot.metadata.fullPath, name: inputs.title})
                });
            } catch(e) {
                console.error(e)
            }
        })

    },
    downloadFile : (media) => {
        const {path} = media
        return new Promise(async resolve => {
            try {
                const fileRef = ref(storage, path);
                const url = await getDownloadURL(fileRef)
                resolve(url)
            } catch(error) {
                switch (error.code) {
                    case 'storage/object-not-found':
                    console.error("File doesn't exist")
                    break;
                    case 'storage/unauthorized':
                    console.error("User doesn't have permission to access the object")
                    break;
                    case 'storage/canceled':
                    console.error("User canceled the upload")
                    break;
                    case 'storage/unknown':
                    default:
                    console.error("Unknown error occurred, inspect the server response")
                }
            }
        })

    },
}

export default Storage;