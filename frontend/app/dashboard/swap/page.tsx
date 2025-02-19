"use client";

import { useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { WalletContext } from "@/context/WalletProvider";
import PaymentGatewayABI from "@/contracts/PaymentGateway.json";
import contractAddresses from "@/contracts/contract-address.json";

const SwapPage = () => {
  const { account, connectWallet } = useContext(WalletContext);
  const [amount, setAmount] = useState("");
  const [tokenFrom, setTokenFrom] = useState("ETH");
  const [tokenTo, setTokenTo] = useState("USDT");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");
  const [error, setError] = useState("");

  const SWAP_ABI = contractAddresses.PaymentGateway;
  const provider = new ethers.BrowserProvider(window.ethereum);

  // Replace with actual Chainlink price feed addresses
  const priceFeedIn = "0x..."; 
  const priceFeedOut = "0x...";

  /** Fetch the estimated converted amount before swapping */
  const fetchConvertedAmount = async () => {
    if (!amount || isNaN(Number(amount))) return;

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const Swap = new ethers.Contract(SWAP_ABI, PaymentGatewayABI.abi, signer);

      const amountInWei = ethers.parseUnits(amount, 18);

      const convertedAmountWei = await Swap.convertTokenAmount(
        amountInWei,
        priceFeedIn,
        priceFeedOut
      );

      setConvertedAmount(ethers.formatUnits(convertedAmountWei, 18));
    } catch (err) {
      console.error("Error fetching converted amount:", err);
      setConvertedAmount("Error");
    }
  };

  /** Handle swapping tokens */
  const handleSwap = async () => {
    if (!account) {
      alert("Please connect your MetaMask wallet!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const Swap = new ethers.Contract(SWAP_ABI, PaymentGatewayABI.abi, signer);

      const amountInWei = ethers.parseUnits(amount, 18);

      const tx = await Swap.swapTokens(
        tokenFrom,
        tokenTo,
        amountInWei,
        priceFeedIn,
        priceFeedOut,
        account
      );

      const receipt = await tx.wait();
      setTransactionHash(receipt.transactionHash);
      alert(`Swap successful! TxHash: ${receipt.transactionHash}`);
    } catch (err) {
      console.error("Swap failed:", err);
      setError("Swap failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /** Fetch estimated conversion when amount changes */
  useEffect(() => {
    if (amount) {
      fetchConvertedAmount();
    }
  }, [amount, tokenFrom, tokenTo]);

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
            {/* Add more tokens here */}
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
            {/* Add more tokens here */}
          </select>
        </div>

        <div className="mt-4">
          <label className="block mb-2">Converted Amount (Estimated)</label>
          <input
            type="text"
            value={convertedAmount || "Fetching..."}
            readOnly
            className="w-full p-3 border rounded-lg bg-gray-100"
          />
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <button
          onClick={handleSwap}
          className="w-full mt-6 p-3 bg-blue-600 text-white rounded-lg"
          disabled={loading}
        >
          {loading ? "Swapping..." : "Swap"}
        </button>

        {transactionHash && (
          <p className="mt-4 text-green-600">
            Swap successful!{" "}
            <a
              href={`https://etherscan.io/tx/${transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-500"
            >
              View Transaction
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default SwapPage;
