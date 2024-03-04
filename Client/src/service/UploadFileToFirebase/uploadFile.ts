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
): Promise<Array<{ url: string; type: string }>> => {
  return new Promise((resolve, reject) => {
    const uploadPromises: Promise<{ url: string; type: string }>[] = [];

    [...files].forEach((fileItem) => {
      const storageRef = ref(storage, `files/${fileItem.name}`);
      const uploadTask = uploadBytesResumable(storageRef, fileItem);

      const uploadPromise = new Promise<{ url: string; type: string }>(
        (innerResolve, innerReject) => {
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
                  innerResolve({ url: downloadURL, type: fileItem.type });
                })
                .catch((error) => {
                  innerReject(error);
                });
            }
          );
        }
      );

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
