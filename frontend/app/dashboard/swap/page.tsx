// pages/swap.js
"use client"

import { useState } from "react";
import { ethers } from "ethers";

const SwapPage = () => {
  const [amount, setAmount] = useState("");
  const [tokenFrom, setTokenFrom] = useState("ETH");
  const [tokenTo, setTokenTo] = useState("USDT");
  const [swapData, setSwapData] = useState(null);

  const handleSwap = async () => {
    // Add logic to interact with your contract and fetch swap data
    // For example, you could use ethers.js to connect to your contract and get the data
  };

  return (
    <div className="flex justify-center items-center p-8">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Swap Tokens</h1>
        <div>
          <label className="block mb-2">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <div className="mt-4">
          <label className="block mb-2">From Token</label>
          <select
            value={tokenFrom}
            onChange={(e) => setTokenFrom(e.target.value)}
            className="w-full p-3 border rounded-lg"
          >
            <option value="ETH">ETH</option>
            <option value="USDT">USDT</option>
            {/* Add more token options here */}
          </select>
        </div>

        <div className="mt-4">
          <label className="block mb-2">To Token</label>
          <select
            value={tokenTo}
            onChange={(e) => setTokenTo(e.target.value)}
            className="w-full p-3 border rounded-lg"
          >
            <option value="ETH">ETH</option>
            <option value="USDT">USDT</option>
            {/* Add more token options here */}
          </select>
        </div>

        <button
          onClick={handleSwap}
          className="w-full mt-6 p-3 bg-blue-600 text-white rounded-lg"
        >
          Swap
        </button>
      </div>
    </div>
  );
};

export default SwapPage;
