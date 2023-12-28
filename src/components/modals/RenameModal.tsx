"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { Input } from "../ui/input";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default () => {
  const { setIsModalOpen, isModalOpen, fileId, fileName } = useAppStore();
  const [input, setInput] = useState(fileName);
  const { user } = useUser();

  const renameFile = async () => {
    if (!user || !fileId) return;

    await setDoc(
      doc(db, "users", user.id, "files", fileId),
      {
        file: { fileName: input },
      },
      { merge: true }
    );

    setInput("");
    setIsModalOpen(null);
  };

  return (
    <Dialog
      open={isModalOpen === "rename"}
      onOpenChange={(isOpen) => {
        setIsModalOpen(isOpen ? "rename" : null);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="pb-2">Rename the File</DialogTitle>
          <Input
            id="Link"
            defaultValue={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDownCapture={(e) => {
              if (e.key === "Enter") {
                renameFile();
              }
            }}
          />
          <div className="flex justify-end space-x-2 py-3">
            <Button
              size={"sm"}
              className="px-3"
              variant={"ghost"}
              onClick={() => setIsModalOpen(null)}
            >
              <span className="sr-only">Cancel</span>
              <span>Cancel</span>
            </Button>
            <Button
              className="px-3"
              type="submit"
              size={"sm"}
              onClick={() => renameFile()}
              variant={"destructive"}
            >
              <span className="sr-only">Rename</span>
              <span>Rename</span>
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
