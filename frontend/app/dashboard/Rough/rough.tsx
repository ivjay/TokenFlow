"use client"

import { useState, useEffect } from "react"
import { ethers } from "ethers"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

// ABI for the NFT Receipt contract (simplified)
const NFT_RECEIPT_ABI = [
  "function mintReceipt(address recipient, uint256 amount, string memory tokenSymbol) public returns (uint256)",
]

const NFT_RECEIPT_ADDRESS = "0x..." // Replace with your actual contract address

export default function CryptoPayment() {
  const [step, setStep] = useState(1)
  const [wallet, setWallet] = useState(null)
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState("")
  const [token, setToken] = useState("ETH")
  const [fee, setFee] = useState("0")
  const [receipt, setReceipt] = useState(null)

  useEffect(() => {
    // Estimate gas fee when amount or recipient changes
    const estimateFee = async () => {
      if (wallet && recipient && amount) {
        try {
          const gasPrice = await wallet.provider.getGasPrice()
          const estimatedGas = await wallet.provider.estimateGas({
            to: recipient,
            value: ethers.utils.parseEther(amount),
          })
          setFee(ethers.utils.formatEther(gasPrice.mul(estimatedGas)))
        } catch (error) {
          console.error("Error estimating fee:", error)
        }
      }
    }
    estimateFee()
  }, [wallet, recipient, amount])

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" })
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const address = await signer.getAddress()
        setWallet({ signer, address })
      } catch (error) {
        console.error("Error connecting wallet:", error)
      }
    } else {
      alert("Please install MetaMask!")
    }
  }

  const handlePayment = async () => {
    if (!wallet || !recipient || !amount) return

    try {
      const tx = await wallet.signer.sendTransaction({
        to: recipient,
        value: ethers.utils.parseEther(amount),
      })
      await tx.wait()

      // Mint NFT receipt
      const nftContract = new ethers.Contract(NFT_RECEIPT_ADDRESS, NFT_RECEIPT_ABI, wallet.signer)
      const mintTx = await nftContract.mintReceipt(wallet.address, ethers.utils.parseEther(amount), token)
      const mintReceipt = await mintTx.wait()
      const receiptId = mintReceipt.events[0].args.tokenId.toString()

      setReceipt({
        id: receiptId,
        hash: tx.hash,
        explorerUrl: `https://etherscan.io/tx/${tx.hash}`,
      })
      setStep(4)
    } catch (error) {
      console.error("Error processing payment:", error)
      alert("Payment failed. Please try again.")
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Crypto Payment</CardTitle>
        <CardDescription>Send crypto and receive an NFT receipt</CardDescription>
      </CardHeader>
      <CardContent>
        {step === 1 && (
          <div className="space-y-4">
            {!wallet ? (
              <Button onClick={connectWallet} className="w-full">
                Connect Wallet
              </Button>
            ) : (
              <div className="text-center">
                <p>Connected Wallet:</p>
                <p className="font-mono text-sm">{wallet.address}</p>
              </div>
            )}
            {wallet && (
              <Button onClick={() => setStep(2)} className="w-full">
                Proceed to Payment
              </Button>
            )}
          </div>
        )}

        {step === 2 && (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setStep(3)
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient Address</Label>
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
              <Label htmlFor="token">Token</Label>
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
            <div className="text-sm text-muted-foreground">Estimated Fee: {fee} ETH</div>
            <Button type="submit" className="w-full">
              Review Payment
            </Button>
          </form>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Payment Summary</h3>
            <p>Recipient: {recipient}</p>
            <p>
              Amount: {amount} {token}
            </p>
            <p>Estimated Fee: {fee} ETH</p>
            <Button onClick={handlePayment} className="w-full">
              Pay Now
            </Button>
          </div>
        )}

        {step === 4 && receipt && (
          <div className="space-y-4 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
            <h3 className="text-lg font-semibold">Payment Successful!</h3>
            <p>NFT Receipt ID: {receipt.id}</p>
            <p>
              Transaction Hash: {receipt.hash.slice(0, 10)}...{receipt.hash.slice(-8)}
            </p>
            <a
              href={receipt.explorerUrl}
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
        {step > 1 && step < 4 && (
          <Button variant="outline" onClick={() => setStep(step - 1)}>
            Back
          </Button>
        )}
        {step === 4 && (
          <Button
            onClick={() => {
              setStep(1)
              setReceipt(null)
            }}
            className="w-full"
          >
            Make Another Payment
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

