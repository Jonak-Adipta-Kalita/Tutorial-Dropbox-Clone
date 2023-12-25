import HomeVideo from "@/components/HomeVideo";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default () => {
  return (
    <div className="flex flex-col lg:flex-row items-center">
      <div className="p-10 flex flex-col text-grey-800 space-y-5">
        <h1 className="text-center lg:text-left text-3xl md:text-4xl xl:text-5xl font-bold">
          Welcome to{" "}
          <span className="underline decoration-slate-500">Dropbox</span>
        </h1>
        <p className="font-semibold text-justify text-sm sm:text-base">
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
      <HomeVideo />
    </div>
  );
};
