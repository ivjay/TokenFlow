"use client"

import { useContext, useState } from "react";
import { ethers } from "ethers";
import { WalletContext } from "@/context/WalletProvider";
import contractAddresses from "@/contracts/contract-address.json";
import PaymentGatewayABI from "@/contracts/PaymentGateway.json";
import PaymentReceiptABI from "@/contracts/PaymentReceipt.json";
import PaymentTokenABI from "@/contracts/PaymentToken.json";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function BuyPAY() {
  const { connected, account } = useContext(WalletContext); // Use wallet context
    
  const [usdAmount, setUsdAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const PAYMENT_GATEWAY_ADDRESS = contractAddresses.PaymentGateway;
  const PAYMENT_RECEIPT_ADDRESS = contractAddresses.PaymentReceipt;
  const PAYMENT_TOKEN_ADDRESS = contractAddresses.PaymentToken;

  const handleBuyPAY = async () => {
    if (!window.ethereum) return alert("Please install MetaMask");

    setLoading(true);
    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
      
        const paymentGateway = new ethers.Contract(
            PAYMENT_GATEWAY_ADDRESS,
            PaymentGatewayABI.abi,
            signer
          );
      
      const usdTokenAddress = "YOUR_USD_TOKEN_ADDRESS";
      const amount = ethers.parseUnits(usdAmount, 18);
      
      const tx = await paymentGateway.buyPAYWithUSD(usdTokenAddress, amount);
      await tx.wait();
      alert("Transaction successful!");
    } catch (error) {
      console.error(error);
      alert("Transaction failed");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Buy PAY with USD</h2>
      <Input
        type="number"
        placeholder="Enter USD amount"
        value={usdAmount}
        onChange={(e) => setUsdAmount(e.target.value)}
        className="w-full mb-4"
      />
      <Button onClick={handleBuyPAY} disabled={loading}>
        {loading ? "Processing..." : "Buy PAY"}
      </Button>
    </div>
  );
}
