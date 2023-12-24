import { FileType } from "@/typings";
import { Button } from "../ui/button";

type Props = { skeletonFiles: FileType[] };

const TableWrapper = ({ skeletonFiles }: Props) => {
  return (
    <div>
      <Button>Sort By ...</Button>
      {/* <DataTable columns={columns} data={initialFiles} /> */}
    </div>
  );
};

export default TableWrapper;
