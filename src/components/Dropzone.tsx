"use client";

import { cn } from "@/lib/utils";
import Dropzone from "react-dropzone";

export default () => {
  const maxSize = 20971520; // 20 MB

  return (
    <Dropzone minSize={0} maxSize={maxSize} maxFiles={1}>
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
