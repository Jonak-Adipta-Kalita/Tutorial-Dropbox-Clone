import Image from "next/image";
import Link from "next/link";
import { SignedOut, UserButton, SignInButton } from "@clerk/nextjs";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="flex items-center justify-between shadow-lg p-5 lg:max-w-6xl mx-auto rounded-xl">
      <Link href="/" className="flex items-center space-x-2">
        <div className="bg-[#0160FE] w-fit">
          <Image
            src={"/dropbox.png"}
            alt="logo"
            className="invert"
            height={50}
            width={50}
          />
        </div>
        <h1 className="font-bold text-xl">Dropbox</h1>
      </Link>
      <div className="flex space-x-2 items-center">
        <UserButton
          afterSignOutUrl="/"
          appearance={{ elements: { userButtonAvatarBox: "h-12 w-12" } }}
        />
        <SignedOut>
          <SignInButton afterSignInUrl="/dashboard" mode="modal" />
        </SignedOut>
      </div>
    </header>
  );
};

export default Header;
