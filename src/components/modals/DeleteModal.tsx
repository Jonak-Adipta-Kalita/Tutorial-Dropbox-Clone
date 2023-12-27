"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppStore } from "@/store/store";

export default () => {
  const { setIsModalOpen, isModalOpen } = useAppStore();
  const deleteFile = async () => {};

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
