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
      timestamp: new Date(doc.data().timestamp.seconds * 1000) || undefined,
    }));

    setInitialFiles(files);
  }, [docs]);

  if (docs?.docs.length === undefined)
    return (
      <div>
        <p>loading...</p>
      </div>
    );

  return (
    <div>
      <Button onClick={() => setSort(sort === "desc" ? "asc" : "desc")}>
        Sort By {sort === "desc" ? "Newest" : "Oldest"}
      </Button>
      <DataTable columns={columns} data={initialFiles} />
    </div>
  );
};

export default TableWrapper;
