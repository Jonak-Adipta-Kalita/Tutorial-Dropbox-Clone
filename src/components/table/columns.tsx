"use client";

import { FileType } from "@/typings";
import { ColumnDef } from "@tanstack/react-table";
import prettyBytes from "pretty-bytes";
import { DefaultExtensionType, FileIcon, defaultStyles } from "react-file-icon";
import { COLOR_EXTENSION_MAP } from "@/lib/constants";
import { PencilIcon } from "lucide-react";
import { useAppStore } from "@/store/store";

export const columns: ColumnDef<FileType>[] = [
  {
    accessorKey: "file.type",
    header: "Type",
    cell: ({ renderValue, ...props }) => {
      const type = renderValue() as string;
      const ext = type.split("/")[1];

      return (
        <div className="w-10">
          <FileIcon
            extension={ext}
            labelColor={
              ext in COLOR_EXTENSION_MAP ? COLOR_EXTENSION_MAP[ext] : "#000000"
            }
            {...defaultStyles[ext as DefaultExtensionType]}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "file.fileName",
    header: "Name",
    cell: ({ renderValue, row, ...props }) => {
      const { setFileId, setFileName, setIsModalOpen } = useAppStore();

      const openRenameModal = (id: string, fileName: string) => {
        setFileId(id);
        setFileName(fileName);
        setIsModalOpen("rename");
      };

      return (
        <p
          onClick={() =>
            openRenameModal(
              (row.original as FileType).id,
              (row.original as FileType).file.fileName
            )
          }
          className="underline flex items-center text-blue-500 hover:cursor-pointer"
        >
          {renderValue() as string} <PencilIcon size={15} className="ml-2" />
        </p>
      );
    },
  },
  {
    accessorKey: "timestamp",
    header: "Date Added",
    cell: ({ renderValue, ...props }) => {
      return (
        <div className="flex flex-col">
          <div className="text-sm">
            {(renderValue() as Date).toLocaleDateString()}
          </div>
          <div className="text-xs text-gray-500">
            {(renderValue() as Date).toLocaleTimeString()}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "file.size",
    header: "Size",
    cell: ({ renderValue, ...props }) => {
      return <span>{prettyBytes(renderValue() as number)} bytes</span>;
    },
  },
  {
    accessorKey: "file.downloadURL",
    header: "Link",
    cell: ({ renderValue, ...props }) => (
      <a
        href={renderValue() as string}
        target="_blank"
        className="text-blue-500 underline hover:text-blue-600"
      >
        Download
      </a>
    ),
  },
];
