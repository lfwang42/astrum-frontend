import React from "react";
import Link from "next/link";
import Image from "next/image";
// import Logo from "./Logo";
// import Button from "./Button";
import march from "./march.webp"
const Navbar = () => {
  return (
    <>
      <div className="w-full h-20 bg-sky-900 sticky top-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex items-center h-full">
            <div className="px-8">
                <Image src={march} width={30}   height={30}   alt="cutie"/>
            </div>
            <ul className="hidden md:flex gap-x-6 text-white">
              <li>
                <Link href="/leaderboard">
                  <p>Leaderboard</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;