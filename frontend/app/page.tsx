"use client"

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ethers } from "ethers";
import { Wallet, CreditCard, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LandingPage() {
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | boolean>(false);
  const router = useRouter();

  const handleConnect = async() => {
    if(typeof window.ethereum === "undefined") {
      setError("MetaMask is not installed.");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts",[]);

        if(accounts.length > 0) {
          setConnected(true);
          router.push("/dashboard");
        }
    } catch (err) {
      setError("Connection failed. Please try again.");
    }
  }

  return (
    <div className="w-full">
      {/* Hero Section - Full Page */}
      <div className="h-screen flex items-center justify-center px-10 text-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold mb-6">Welcome to TokenFlow</h1>
          <p className="text-gray-600 mb-8">
            A Decentralized Payment Gateway with NFT-powered Receipts is
            transforming the way transactions are conducted. By leveraging
            blockchain technology, it ensures secure, transparent, and
            decentralized payments. With NFT-powered receipts, users gain
            verifiable proof of transactions, enhancing trust and authenticity
            in the digital payment ecosystem.
          </p>
          <div className="space-x-4">
            <Button variant="outline" onClick={handleConnect} className="px-6 py-3 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">{connected ? "Connected" : "Connect Wallet"}</Button>
          </div>
        </div>
      </div>

      {/* Page Content (How It Works + Token Value + Featured Products) */}
      <div className="py-16 bg-gray-100 dark:bg-gray-800">
        {/* How It Works Section */}
        <div className="pb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-10">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wallet className="mr-2 h-5 w-5" />
                  Send ETH
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Connect your wallet and send ETH to our platform.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Get SitaCoin
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Your ETH is converted to SitaCoin tokens at the current rate.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Purchase Products
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Use your SitaCoin tokens to buy products in our marketplace.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Token Value Section */}
        <div className="pb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
            Token Value
          </h2>
          <div className="flex justify-center">
            <Card>
              <CardHeader>
                <CardTitle>Current SitaCoin Value</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">1 STC = $0.15 USD</p>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-gray-500">
                  Last updated: 2 minutes ago
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Featured Products Section */}
        <div className="py-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-10">
            {[1, 2, 3].map((product) => (
              <Card key={product}>
                <CardContent className="p-4">
                  <img
                    src={`/placeholder.svg?height=200&width=300`}
                    alt={`Product ${product}`}
                    className="w-full h-48 object-cover mb-4 rounded-md"
                  />
                  <h3 className="text-xl font-bold mb-2">Product {product}</h3>
                  <p className="text-gray-500 mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">100 STC</span>
                    <Button size="sm">
                      Buy Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 DecentralPay. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
