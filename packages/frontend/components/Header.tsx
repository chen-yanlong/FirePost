"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

/**
 * Site header
 */
export const Header = () => {

  return (
    <nav>
        <div className="">
        <div className="flex justify-between h-20 px-10 shadow items-center">
            <div className="flex items-center space-x-8">
            <h1 className="text-xl lg:text-2xl font-bold cursor-pointer italic text-red-500">FirePost</h1>
            </div>
            <div className="flex space-x-4 items-center">
            <ConnectButton/> 
            </div>
        </div>
        </div>
    </nav>
  );
};
