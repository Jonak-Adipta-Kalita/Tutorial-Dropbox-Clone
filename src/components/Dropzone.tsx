"use client";

import { db, storage } from "@/lib/firebase";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import Dropzone from "react-dropzone";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default () => {
  const [loading, setLoading] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();

  const maxSize = 20971520; // 20 MB

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => {};
      reader.onerror = () => {};
      reader.onload = async () => {
        await uploadPost(file);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const uploadPost = async (selectedFile: File) => {
    if (loading) return;
    if (!user) return;

    setLoading(true);

    const docRef = await addDoc(collection(db, "users", user.id, "files"), {
      user: {
        id: user.id,
        fullName: user.fullName,
        profileImg: user.imageUrl,
      },
      file: {
        fileName: selectedFile.name,
        type: selectedFile.type,
        size: selectedFile.size,
      },
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`);
    uploadBytes(imageRef, selectedFile).then(async () => {
      const downloadURL = await getDownloadURL(imageRef);

      await setDoc(
        doc(db, "users", user.id, "files", docRef.id),
        {
          file: { downloadURL: downloadURL },
        },
        { merge: true }
      );
    });

    setLoading(false);
  };

  return (
    <Dropzone minSize={0} maxSize={maxSize} onDrop={onDrop}>
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
      }) => {
        const isFileTooLarge =
          fileRejections.length > 0 && fileRejections[0].file.size > maxSize;

        return (
          <section className="m-4 cursor-pointer">
            <div
              {...getRootProps()}
              className={cn(
                "w-full h-32 flex justify-center items-center p-5 border border-dashed rounded-lg text-center font-semibold",
                isDragActive
                  ? "bg-gray-400 text-gray-100 animate-pulse"
                  : "bg-gray-300 text-gray-900"
              )}
            >
              <input {...getInputProps()} />
              {!isDragActive && "Click here or drop a file to upload!"}
              {isDragActive && !isDragReject && "Drop to upload this file!"}
              {isDragReject && "File type not accepted, sorry!"}
              {isFileTooLarge && (
                <div className="text-danger mt-2">File is too large.</div>
              )}
            </div>
          </section>
        );
      }}
    </Dropzone>
  );
};
