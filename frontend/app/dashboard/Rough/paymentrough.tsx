import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export default function CryptoPaymentUI() {
  return (
    <div className="space-y-8 w-full max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Payment Form</CardTitle>
          <CardDescription>Enter payment details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient Wallet Address</Label>
            <Input id="recipient" placeholder="0x..." value="0x742d35Cc6634C0532925a3b844Bc454e4438f44e" readOnly />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input id="amount" type="number" placeholder="0.00" value="1.5" readOnly />
          </div>
          <div className="space-y-2">
            <Label htmlFor="token">Payment Token</Label>
            <Select defaultValue="ETH">
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
          <div className="text-sm text-muted-foreground">Estimated Transaction Fee: 0.005 ETH</div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Review Payment</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Confirmation</CardTitle>
          <CardDescription>Review your payment details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>
            <strong>Recipient:</strong> 0x742d35Cc6634C0532925a3b844Bc454e4438f44e
          </p>
          <p>
            <strong>Amount:</strong> 1.5 ETH
          </p>
          <p>
            <strong>Estimated Fee:</strong> 0.005 ETH
          </p>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Pay Now</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Successful</CardTitle>
          <CardDescription>Your NFT receipt has been generated</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
          <div>
            <p>
              <strong>NFT Receipt ID:</strong> 12345
            </p>
            <p>
              <strong>Transaction Hash:</strong> 0x1234...5678
            </p>
          </div>
          <a
            href="https://etherscan.io/tx/0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            View on Etherscan
          </a>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Make Another Payment</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

