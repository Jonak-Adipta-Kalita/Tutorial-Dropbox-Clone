import Image from "next/image";
import Link from "next/link";
import { SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

type Props = {};

const Header = ({}: Props) => {
  return (
    <header className="flex items-center justify-between shadow-lg p-5 rounded-xl z-50">
      <Link href="/" className="flex items-center space-x-2">
        <div className="w-fit rounded-full px">
          <Image
            src={"/dropbox.svg"}
            alt="logo"
            height={50}
            width={50}
            className="p-[5px]"
          />
        </div>
        <h1 className="font-bold text-xl">Dropbox</h1>
      </Link>
      <div className="pr-[5px]">
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: { userButtonAvatarBox: "h-12 w-12" },
          }}
        />
        <SignedOut>
          <SignInButton afterSignInUrl="/dashboard" mode="modal">
            <Button variant="secondary">Sign in</Button>
          </SignInButton>
        </SignedOut>
      </div>
    </header>
  );
};

export default Header;
