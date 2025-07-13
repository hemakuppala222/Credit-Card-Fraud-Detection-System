import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Clock, MapPin, CreditCard } from 'lucide-react';

interface Transaction {
  id: string;
  amount: number;
  merchant: string;
  location: string;
  time: string;
  riskScore: number;
  status: 'approved' | 'declined' | 'pending' | 'flagged';
  cardNumber: string;
}

const TransactionMonitor: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<'all' | 'flagged' | 'high-risk'>('all');

  useEffect(() => {
    // Generate mock transaction data
    const generateTransactions = (): Transaction[] => {
      const merchants = ['Amazon', 'Walmart', 'Target', 'Starbucks', 'Shell', 'McDonald\'s', 'Best Buy', 'Home Depot'];
      const locations = ['New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Phoenix, AZ', 'Philadelphia, PA'];
      const statuses: ('approved' | 'declined' | 'pending' | 'flagged')[] = ['approved', 'declined', 'pending', 'flagged'];
      
      return Array.from({ length: 20 }, (_, i) => ({
        id: `txn_${Date.now()}_${i}`,
        amount: Math.round((Math.random() * 2000 + 10) * 100) / 100,
        merchant: merchants[Math.floor(Math.random() * merchants.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        time: new Date(Date.now() - Math.random() * 3600000).toLocaleTimeString(),
        riskScore: Math.round(Math.random() * 100),
        status: statuses[Math.floor(Math.random() * statuses.length)],
        cardNumber: `**** **** **** ${Math.floor(1000 + Math.random() * 9000)}`
      }));
    };

    setTransactions(generateTransactions());

    // Simulate real-time updates
    const interval = setInterval(() => {
      setTransactions(prev => {
        const newTransactions = generateTransactions().slice(0, 3);
        return [...newTransactions, ...prev.slice(0, 17)];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const filteredTransactions = transactions.filter(transaction => {
    switch (filter) {
      case 'flagged':
        return transaction.status === 'flagged';
      case 'high-risk':
        return transaction.riskScore > 70;
      default:
        return true;
    }
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'declined':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case 'flagged':
        return <AlertCircle className="h-5 w-5 text-orange-600" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-100';
      case 'declined':
        return 'text-red-600 bg-red-100';
      case 'flagged':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-yellow-600 bg-yellow-100';
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-red-600 bg-red-100';
    if (score >= 50) return 'text-orange-600 bg-orange-100';
    return 'text-green-600 bg-green-100';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Live Transaction Monitor</h3>
        <div className="flex space-x-2">
          {['all', 'flagged', 'high-risk'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === filterType
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{transactions.filter(t => t.status === 'approved').length}</div>
            <div className="text-sm text-gray-600">Approved</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{transactions.filter(t => t.status === 'declined').length}</div>
            <div className="text-sm text-gray-600">Declined</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{transactions.filter(t => t.status === 'flagged').length}</div>
            <div className="text-sm text-gray-600">Flagged</div>
          </div>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {getStatusIcon(transaction.status)}
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-gray-900">{transaction.merchant}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      {transaction.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                    <span className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-1" />
                      {transaction.cardNumber}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {transaction.location}
                    </span>
                    <span>{transaction.time}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-gray-900">${transaction.amount.toLocaleString()}</div>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm text-gray-600">Risk:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(transaction.riskScore)}`}>
                    {transaction.riskScore}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionMonitor;