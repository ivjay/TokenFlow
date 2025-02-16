// pages/get-token.js

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function GetTokenPage() {
  const [email, setEmail] = useState("")
  const [walletAddress, setWalletAddress] = useState("")

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    alert("Token request submitted successfully!")
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="p-8 border rounded-md shadow-lg bg-white">
        <h2 className="text-2xl font-bold mb-6">Request Your Token</h2>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
            placeholder="Enter your email"
          />
        </div>

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

        <Button type="submit" className="w-full">
          Request Token
        </Button>
      </form>
    </div>
  )
}
