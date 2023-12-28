"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { db, storage } from "@/lib/firebase";
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

export default () => {
  const { setIsModalOpen, isModalOpen, fileId } = useAppStore();
  const { user } = useUser();

  const deleteFile = async () => {
    if (!user || !fileId) return;

    const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);

    try {
      await deleteObject(fileRef);
      await deleteDoc(doc(db, "users", user.id, "files", fileId));
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsModalOpen(null);
    }
  };

  return (
    <Dialog
      open={isModalOpen === "delete"}
      onOpenChange={(isOpen) => {
        setIsModalOpen(isOpen ? "delete" : null);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            file!
          </DialogDescription>
        </DialogHeader>
        <div className="flex space-x-2 py-3">
          <Button
            size={"sm"}
            className="px-3 flex-1"
            variant={"ghost"}
            onClick={() => setIsModalOpen(null)}
          >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
          </Button>
          <Button
            className="px-3 flex-1"
            variant={"destructive"}
            type="submit"
            size={"sm"}
            onClick={() => deleteFile()}
          >
            <span className="sr-only">Delete</span>
            <span>Delete</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
