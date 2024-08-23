import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface BalanceProps {} // Empty interface for type safety (optional)

const Balance: React.FC<BalanceProps> = () => {
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Added error state

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError("No token found");
          setIsLoading(false);
          return;
        }

        const response = await axios.get<BalanceData>('/api/account/balance', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBalance(response.data.balance);
        setIsLoading(false);
      } catch (error) {
        setError("There was an error fetching the balance");
        setIsLoading(false);
      }
    };

    fetchBalance();
  }, []);

  return (
    <div className="container mx-auto px-4 pt-8">
      <div className="bg-slate-700 p-6 sm:p-10 rounded-2xl shadow-lg">
        {isLoading ? (
          <p className="text-lg sm:text-xl text-white">Loading balance...</p>
        ) : error ? (
          <p className="text-lg sm:text-xl text-red-400">{error}</p> // Show error message
        ) : (
          <>
            <h1 className="text-2xl sm:text-3xl font-medium text-white">Balance:</h1>
            <h1 className="text-2xl sm:text-3xl font-medium text-green-400">₹{balance}</h1>
          </>
        )}
      </div>
    </div>
  );
};

export default Balance;

interface BalanceData {
  balance: number;
}
