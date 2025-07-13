import React, { useState } from 'react';
import { Search, Filter, Download, MapPin, CreditCard, Calendar, DollarSign, User, AlertTriangle } from 'lucide-react';

interface TransactionDetail {
  id: string;
  cardNumber: string;
  cardType: string;
  cardHolder: string;
  amount: number;
  currency: string;
  merchant: string;
  merchantCategory: string;
  location: string;
  country: string;
  timestamp: string;
  status: 'approved' | 'declined' | 'pending' | 'flagged';
  riskScore: number;
  riskFactors: string[];
  ipAddress: string;
  deviceInfo: string;
  authMethod: string;
}

const TransactionDetails: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionDetail | null>(null);

  const transactions: TransactionDetail[] = [
    {
      id: 'txn_1234567890',
      cardNumber: '**** **** **** 4567',
      cardType: 'Visa',
      cardHolder: 'John Smith',
      amount: 2500.00,
      currency: 'USD',
      merchant: 'TechStore Online',
      merchantCategory: 'Electronics',
      location: 'New York, NY',
      country: 'United States',
      timestamp: '2024-01-15 14:23:45',
      status: 'flagged',
      riskScore: 87,
      riskFactors: ['High amount', 'Velocity check failed', 'New merchant'],
      ipAddress: '192.168.1.100',
      deviceInfo: 'Chrome 120.0 on Windows 10',
      authMethod: 'Chip & PIN'
    },
    {
      id: 'txn_1234567891',
      cardNumber: '**** **** **** 8901',
      cardType: 'Mastercard',
      cardHolder: 'Sarah Johnson',
      amount: 89.99,
      currency: 'USD',
      merchant: 'Coffee Shop',
      merchantCategory: 'Food & Dining',
      location: 'Los Angeles, CA',
      country: 'United States',
      timestamp: '2024-01-15 14:18:32',
      status: 'approved',
      riskScore: 15,
      riskFactors: [],
      ipAddress: '10.0.0.50',
      deviceInfo: 'Safari 17.0 on iPhone',
      authMethod: 'Contactless'
    },
    {
      id: 'txn_1234567892',
      cardNumber: '**** **** **** 2345',
      cardType: 'American Express',
      cardHolder: 'Michael Brown',
      amount: 1200.00,
      currency: 'USD',
      merchant: 'Luxury Hotel',
      merchantCategory: 'Travel',
      location: 'Miami, FL',
      country: 'United States',
      timestamp: '2024-01-15 14:15:21',
      status: 'approved',
      riskScore: 34,
      riskFactors: ['Travel transaction'],
      ipAddress: '172.16.0.10',
      deviceInfo: 'Firefox 121.0 on Mac OS',
      authMethod: 'Signature'
    }
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.cardHolder.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
    if (score >= 70) return 'text-red-600 bg-red-100';
    if (score >= 40) return 'text-orange-600 bg-orange-100';
    return 'text-green-600 bg-green-100';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Transaction Details</h3>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Download className="h-4 w-4" />
          <span>Export</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="approved">Approved</option>
            <option value="declined">Declined</option>
            <option value="flagged">Flagged</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Transaction</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Card Holder</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Merchant</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Location</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Risk</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr 
                  key={transaction.id} 
                  className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedTransaction(transaction)}
                >
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-gray-900">{transaction.id}</div>
                      <div className="text-sm text-gray-500">{transaction.timestamp}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-gray-900">{transaction.cardHolder}</div>
                      <div className="text-sm text-gray-500">{transaction.cardNumber}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-gray-900">${transaction.amount.toLocaleString()}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-gray-900">{transaction.merchant}</div>
                      <div className="text-sm text-gray-500">{transaction.merchantCategory}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-900">{transaction.location}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      {transaction.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(transaction.riskScore)}`}>
                      {transaction.riskScore}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full mx-4 p-6 max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Transaction Details</h3>
              <button
                onClick={() => setSelectedTransaction(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Basic Information */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-5 w-5 text-gray-400" />
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Transaction ID</label>
                        <p className="text-gray-900">{selectedTransaction.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-gray-400" />
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Card Holder</label>
                        <p className="text-gray-900">{selectedTransaction.cardHolder}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Amount</label>
                        <p className="text-gray-900 text-xl font-bold">${selectedTransaction.amount.toLocaleString()} {selectedTransaction.currency}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Timestamp</label>
                        <p className="text-gray-900">{selectedTransaction.timestamp}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Card Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Card Number</label>
                      <p className="text-gray-900">{selectedTransaction.cardNumber}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Card Type</label>
                      <p className="text-gray-900">{selectedTransaction.cardType}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Authentication Method</label>
                      <p className="text-gray-900">{selectedTransaction.authMethod}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location & Risk Information */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Location & Merchant</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <p className="text-gray-900">{selectedTransaction.location}, {selectedTransaction.country}</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Merchant</label>
                      <p className="text-gray-900">{selectedTransaction.merchant}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Category</label>
                      <p className="text-gray-900">{selectedTransaction.merchantCategory}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Risk Assessment</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="h-5 w-5 text-gray-400" />
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Risk Score</label>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getRiskColor(selectedTransaction.riskScore)}`}>
                            {selectedTransaction.riskScore}%
                          </span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                selectedTransaction.riskScore >= 70 ? 'bg-red-500' : 
                                selectedTransaction.riskScore >= 40 ? 'bg-orange-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${selectedTransaction.riskScore}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedTransaction.status)}`}>
                        {selectedTransaction.status.toUpperCase()}
                      </span>
                    </div>
                    {selectedTransaction.riskFactors.length > 0 && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Risk Factors</label>
                        <div className="flex flex-wrap gap-2">
                          {selectedTransaction.riskFactors.map((factor, index) => (
                            <span key={index} className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                              {factor}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Technical Details</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">IP Address</label>
                      <p className="text-gray-900">{selectedTransaction.ipAddress}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Device Information</label>
                      <p className="text-gray-900">{selectedTransaction.deviceInfo}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionDetails;