"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const NFT_RECEIPT_ABI = [
  "function mintReceipt(address recipient, uint256 amount, string memory tokenSymbol) public returns (uint256)",
];

const NFT_RECEIPT_ADDRESS = "0x...";

export default function Payment() {
  const [step, setStep] = useState(1);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState("ETH");
  const [fee, setFee] = useState("0");
  const [receipt, setReceipt] = useState(null);

  const [wallet, setWallet] = useState("");
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (window.ethereum) {
        const provider = new Web3Provider(window.ethereum);
        const accounts = await provider.listAccounts();
        const userBalance = await provider.getBalance(accounts[0]);

        setWallet(accounts[0]);
        setBalance(ethers.formatEther(userBalance.toString()));
      }
    };

    checkWalletConnection();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Payment</CardTitle>
          <CardDescription>
            Send crypto and receive an NFT receipt
          </CardDescription>
          {wallet && (
            <div className="mt-2 text-sm text-muted-foreground">
              <p className="font-semibold pb-2">Wallet Address: {wallet}</p>
              <p className="font-semibold">Balance: {balance} ETH</p>
            </div>
          )}
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStep(2);
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient Wallet Address</Label>
                <Input
                  id="recipient"
                  placeholder="0x..."
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.000001"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="token">Payment Token</Label>
                <Select value={token} onValueChange={setToken}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select token" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ETH">ETH</SelectItem>
                    <SelectItem value="USDT">USDT</SelectItem>
                    <SelectItem value="USDC">USDC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="text-sm text-muted-foreground">
                Estimated Transaction Fee: {fee} ETH
              </div>
              <Button type="submit" className="w-full">
                Review Payment
              </Button>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Payment Confirmation</h3>
              <p>Recipient: {recipient}</p>
              <p>
                Amount: {amount} {token}
              </p>
              <p>Estimated Fee: {fee} ETH</p>
              <Button className="w-full">Pay Now</Button>
            </div>
          )}

          {step === 3 && receipt && (
            <div className="space-y-4 text-center">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
              <h3 className="text-lg font-semibold">Payment Successful!</h3>
              <p>NFT Receipt ID: </p>
              <p>Transaction Hash:</p>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View on Etherscan
              </a>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {step === 2 && (
            <Button variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
          )}
          {/* {step === 3 && (
            <Button
              onClick={() => {
                setStep(1);
                setReceipt(null);
              }}
              className="w-full"
            >
              Make Another Payment
            </Button>
          )} */}

          {step === 2 && (
            <Button
              className="w-full"
              onClick={() => {
                const newTransaction = {
                  recipient,
                  amount,
                  token,
                  date: new Date().toLocaleString(),
                };

                // Save to localStorage
                const existingTransactions = JSON.parse(
                  localStorage.getItem("transactions") || "[]"
                );
                existingTransactions.push(newTransaction);
                localStorage.setItem(
                  "transactions",
                  JSON.stringify(existingTransactions)
                );

                setStep(3); // Move to success step
              }}
            >
              Pay Now
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
