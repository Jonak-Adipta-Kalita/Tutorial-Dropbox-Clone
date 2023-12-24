import Dropzone from "@/components/Dropzone";
import { auth } from "@clerk/nextjs";

type Props = {};

const DashboardPage = (props: Props) => {
  const { userId } = auth();

  return (
    <div>
      <Dropzone />
    </div>
  );
};

export default DashboardPage;
