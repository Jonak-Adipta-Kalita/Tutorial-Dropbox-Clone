import { FileType } from "@/typings";
import { Button } from "../ui/button";
import { columns } from "./columns";
import { DataTable } from "./Table";

type Props = { skeletonFiles: FileType[] };

const TableWrapper = ({ skeletonFiles }: Props) => {
  return (
    <div>
      <Button>Sort By ...</Button>
      <DataTable columns={columns} data={skeletonFiles} />
    </div>
  );
};

export default TableWrapper;
