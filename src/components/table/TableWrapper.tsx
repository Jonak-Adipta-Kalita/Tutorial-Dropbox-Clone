"use client";

import { FileType } from "@/typings";
import { Button } from "../ui/button";
import { columns } from "./columns";
import { DataTable } from "./Table";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { Skeleton } from "../ui/skeleton";

type Props = { skeletonFiles: FileType[] };

const TableWrapper = ({ skeletonFiles }: Props) => {
  const { user } = useUser();
  const [initialFiles, setInitialFiles] = useState<FileType[]>([]);
  const [sort, setSort] = useState<"asc" | "desc">("desc");

  const [docs, loading, error] = useCollection(
    user &&
      query(
        collection(db, "users", user.id, "files"),
        orderBy("timestamp", sort)
      )
  );

  useEffect(() => {
    if (!docs) return;
    const files = docs?.docs.map((doc) => ({
      id: doc.id,
      user: {
        id: doc.data().user.id,
        fullName: doc.data().user.fullName,
        profileImg: doc.data().user.profileImg,
      },
      file: {
        fileName: doc.data().file.fileName || doc.id,
        type: doc.data().file.type,
        size: doc.data().file.size,
        downloadURL: doc.data().file.downloadURL,
      },
      timestamp: new Date(doc.data().timestamp * 1000) || undefined,
    }));

    setInitialFiles(files);
  }, [docs]);

  if (docs?.docs.length === undefined)
    return (
      <div className="flex flex-col">
        <Button variant="outline" className="ml-auto w-36 h-10 mb-5">
          <Skeleton className="h-5 w-full" />
        </Button>
        <div className="border rounded-lg">
          <div className="border-b h-12" />
          {skeletonFiles.map((file) => (
            <div
              className="flex items-center space-x-4 p-5 w-full"
              key={file.id}
            >
              <Skeleton className="h-12 w-12" />
              <Skeleton className="h-12 w-full" />
            </div>
          ))}
          {skeletonFiles.length === 0 && (
            <div className="flex items-center space-x-4 p-5 w-full">
              <Skeleton className="h-12 w-12" />
              <Skeleton className="h-12 w-full" />
            </div>
          )}
        </div>
      </div>
    );

  return (
    <div className="flex flex-col space-y-5 pb-10">
      <Button
        variant={"outline"}
        onClick={() => setSort(sort === "desc" ? "asc" : "desc")}
        className="ml-auto w-fit"
      >
        Sort By {sort === "desc" ? "Newest" : "Oldest"}
      </Button>
      <DataTable columns={columns} data={initialFiles} />
    </div>
  );
};

export default TableWrapper;
