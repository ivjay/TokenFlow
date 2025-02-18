"use client"

import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import ThemeToggle from "./theme";

export default function Navbar() {
  return (
    <nav className="shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="/dashboard" className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">TokenFlow</Link>
       
        <div className="flex space-x-12">
          <Link href="/dashboard/payments" className="font-semibold hover:text-blue-700">
            Payment
          </Link>
          <Link href="/dashboard/transaction" className="font-semibold hover:text-blue-700">
            History
          </Link>
          <Link href="/dashboard/nft_Receipt" className=" font-semibold hover:text-blue-700">
            Receipt
          </Link>
          <Link href="/dashboard/swap" className="font-semibold hover:text-blue-700">
            Swap
          </Link>
        </div>
        <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="outline" className="font-semibold">Connect</Button>
        </div>
      </div>
    </nav>
  );
}
