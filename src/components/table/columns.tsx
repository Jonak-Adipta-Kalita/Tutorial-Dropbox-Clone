"use client";

import { FileType } from "@/typings";
import { ColumnDef } from "@tanstack/react-table";
import prettyBytes from "pretty-bytes";
import { DefaultExtensionType, FileIcon, defaultStyles } from "react-file-icon";
import { COLOR_EXTENSION_MAP } from "@/lib/constants";

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
  },
  {
    accessorKey: "timestamp",
    header: "Date Added",
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
