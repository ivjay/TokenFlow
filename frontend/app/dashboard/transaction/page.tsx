"use client"

import { useState } from "react"
import Payment from "../payments/page"
// import TransactionHistory from "./transaction-history"

// Dummy data for initial transactions
const initialTransactions = [
  {
    id: 1,
    date: "2023-06-01T10:00:00Z",
    recipient: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    amount: "0.5",
    token: "ETH",
    status: "Completed",
  },
  {
    id: 2,
    date: "2023-06-02T14:30:00Z",
    recipient: "0x1234567890123456789012345678901234567890",
    amount: "100",
    token: "USDT",
    status: "Completed",
  },
  // Add more dummy transactions as needed
]

export default function CryptoDashboard() {
  const [transactions, setTransactions] = useState(initialTransactions)

  const handleNewTransaction = (newTransaction: { id: number; date: string; recipient: string; amount: string; token: string; status: string }) => {
    setTransactions((prevTransactions) => [newTransaction, ...prevTransactions])
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-2xl font-bold mb-4">Crypto Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* <Payment onPaymentComplete={handleNewTransaction} /> */}
        {/* <TransactionHistory transactions={transactions} /> */}
      </div>
    </div>
  )
}

