import { storage } from "../../config/firebase";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  UploadTaskSnapshot,
} from "firebase/storage";

export const API_FETCH_FILE = (
  files: FileList,
  onStateChanged: (progress: number) => void
): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const uploadPromises: Promise<string>[] = [];

    [...files].forEach((fileItem) => {
      const storageRef = ref(storage, `files/${fileItem.name}`);
      const uploadTask = uploadBytesResumable(storageRef, fileItem);

      const uploadPromise = new Promise<string>((innerResolve, innerReject) => {
        uploadTask.on(
          "state_changed",
          (snapshot: UploadTaskSnapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            onStateChanged(progress);
          },
          (error) => {
            innerReject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then((downloadURL) => {
                innerResolve(downloadURL);
              })
              .catch((error) => {
                innerReject(error);
              });
          }
        );
      });

      uploadPromises.push(uploadPromise);
    });

    Promise.all(uploadPromises)
      .then((urlArr) => {
        resolve(urlArr);
      })
      .catch((error) => {
        reject(error);
      });
  });
};