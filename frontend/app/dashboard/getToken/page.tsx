"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function GetTokenPage() {
  const [tokensNeeded, setTokensNeeded] = useState(1) // Default to 1 token
  const [walletAddress, setWalletAddress] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isZeroTokenDialog, setIsZeroTokenDialog] = useState(false)

  // Token value in USD and ETH
  const tokenValueUSD = 0.15
  const ethToUsd = 1800 // Example ETH to USD rate (this can be dynamic in a real scenario)
  const tokenValueETH = parseFloat((tokenValueUSD / ethToUsd).toFixed(6)) // 1 token = 0.15 USD => token value in ETH

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (tokensNeeded === 0) {
      setIsZeroTokenDialog(true)
    } else {
      setIsDialogOpen(true)
    }
  }

  // Calculate total USD and ETH required based on tokens needed
  const totalUSD = (tokensNeeded * tokenValueUSD).toFixed(2)
  const totalETH = (tokensNeeded * tokenValueETH).toFixed(6)

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="p-8 border rounded-md shadow-lg bg-white w-96">
        <h2 className="text-2xl font-bold mb-6">Request Tokens</h2>

        <div className="mb-4">
          <label htmlFor="walletAddress" className="block text-sm font-medium text-gray-700">Wallet Address</label>
          <input
            type="text"
            id="walletAddress"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            required
            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
            placeholder="Enter your wallet address"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="tokensNeeded" className="block text-sm font-medium text-gray-700">Number of Tokens Needed</label>
          <input
            type="number"
            id="tokensNeeded"
            value={tokensNeeded}
            onChange={(e) => setTokensNeeded(Number(e.target.value))}
            min="0"
            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
            placeholder="Enter the number of tokens"
          />
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-700">1 Token = {tokenValueUSD} USD</p>
          <p className="text-sm text-gray-700">1 Token = {tokenValueETH} ETH (Approx.)</p>
          <p className="text-sm text-gray-700">Total: {totalUSD} USD | {totalETH} ETH</p>
        </div>

        <Button type="submit" className="w-full">
          Request Token
        </Button>
      </form>

      {/* Dialog for 0 tokens */}
      <Dialog open={isZeroTokenDialog} onOpenChange={() => setIsZeroTokenDialog(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invalid Token Amount</DialogTitle>
          </DialogHeader>
          <p className="mb-4">You cannot request 0 tokens. Please enter a valid amount.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsZeroTokenDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog for valid token request */}
      <Dialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Token Request Confirmation</DialogTitle>
          </DialogHeader>
          <p className="mb-4">You are about to request {tokensNeeded} token(s), which will be deducted from your MetaMask account.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => alert('Token request submitted successfully!')}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}