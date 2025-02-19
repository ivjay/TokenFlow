'use client';

import { useState } from 'react';
import { ethers } from 'ethers';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Example Chainlink Price Feeds (Replace with actual addresses)
const TOKEN_FEEDS = {
  ETH: '0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419',
  BTC: '0xf4030086522a5beea4988f8ca5b36dbc97bee88c',
};

type Token = keyof typeof TOKEN_FEEDS;

export default function PriceConverter() {
  const [amount, setAmount] = useState('');
  const [fromToken, setFromToken] = useState<Token>('ETH');
  const [toToken, setToToken] = useState<Token>('BTC');
  const [convertedAmount, setConvertedAmount] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchPrice(priceFeed: string | ethers.Addressable) {
    const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_INFURA_RPC);
    const aggregator = new ethers.Contract(
      priceFeed,
      ['function latestRoundData() view returns (uint80, int256, uint256, uint256, uint80)'],
      provider
    );
    const [, price] = await aggregator.latestRoundData();
    return Number(price) / 1e8; // Chainlink prices have 8 decimals
  }

  async function handleConvert() {
    setLoading(true);
    try {
      const price1 = await fetchPrice(TOKEN_FEEDS[fromToken]);
      const price2 = await fetchPrice(TOKEN_FEEDS[toToken]);
      const converted = (parseFloat(amount) * price1) / price2;
      setConvertedAmount(converted.toFixed(6));
    } catch (error) {
      console.error('Error fetching prices:', error);
      setConvertedAmount('Error');
    }
    setLoading(false);
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-96 p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Token Converter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <select
            className="w-full p-2 border rounded-lg"
            value={fromToken}
            onChange={(e) => setFromToken(e.target.value as Token)}
          >
            {Object.keys(TOKEN_FEEDS).map((token) => (
              <option key={token} value={token}>{token}</option>
            ))}
          </select>
          <span className="block text-center text-xl">⬇️</span>
          <select
            className="w-full p-2 border rounded-lg"
            value={toToken}
            onChange={(e) => setToToken(e.target.value as Token)}
          >
            {Object.keys(TOKEN_FEEDS).map((token) => (
              <option key={token} value={token}>{token}</option>
            ))}
          </select>
          <Button onClick={handleConvert} disabled={loading} className="w-full">
            {loading ? 'Converting...' : 'Convert'}
          </Button>
          {convertedAmount !== null && (
            <div className="text-center mt-4 text-lg font-bold">
              Converted Amount: {convertedAmount} {toToken}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
