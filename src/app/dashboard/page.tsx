import Dropzone from "@/components/Dropzone";
import { db } from "@/lib/firebase";
import { FileType } from "@/typings";
import { auth } from "@clerk/nextjs";
import { getDocs, collection } from "firebase/firestore";

type Props = {};

const DashboardPage = async (props: Props) => {
  const { userId } = auth();

  const docsResults = await getDocs(collection(db, "users", userId!, "files"));
  const skeletonFiles: FileType[] = docsResults.docs.map((doc) => ({
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

  return (
    <div>
      <Dropzone />

      <section></section>
    </div>
  );
};

export default DashboardPage;
