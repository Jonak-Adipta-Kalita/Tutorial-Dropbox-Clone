import Image from "next/image";
import Link from "next/link";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="flex items-center justify-between">
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
    </header>
  );
};

export default Header;
