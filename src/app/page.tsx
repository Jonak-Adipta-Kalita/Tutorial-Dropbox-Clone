import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default () => {
  return (
    <div>
      <div className="p-10 flex flex-col text-grey-800 space-y-5">
        <h1 className="text-5xl font-bold">
          Welcome to Dropbox. <br />
          Storing everything for you and your business needs. All in one place
        </h1>
        <p>
          Enhance your personal storage with Dropbox, offering a simple and
          efficient way to upload, organize, and access files from anywhere.
          Securely store important documents and media, and experience the
          convenience of easy file management and sharing in one centralized
          solution.
        </p>
        <Button variant="default" className="w-fit">
          <Link href="/dashboard" className="flex ml-2">
            Try it for free!
            <ArrowRight className="ml-10" />
          </Link>
        </Button>
      </div>
    </div>
  );
};
