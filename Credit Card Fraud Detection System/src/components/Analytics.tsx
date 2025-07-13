import React, { useState } from 'react';
import { TrendingUp, TrendingDown, BarChart3, PieChart, Calendar } from 'lucide-react';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');

  const fraudStats = {
    detectionRate: 98.7,
    falsePositiveRate: 1.2,
    avgResponseTime: 2.3,
    totalAlerts: 147,
    resolvedAlerts: 132,
    pendingAlerts: 15
  };

  const riskDistribution = [
    { risk: 'Low (0-30)', count: 1847, percentage: 74.2, color: 'bg-green-500' },
    { risk: 'Medium (31-70)', count: 523, percentage: 21.0, color: 'bg-yellow-500' },
    { risk: 'High (71-100)', count: 119, percentage: 4.8, color: 'bg-red-500' }
  ];

  const fraudTrends = [
    { date: '2024-01-09', detected: 12, prevented: 11 },
    { date: '2024-01-10', detected: 8, prevented: 7 },
    { date: '2024-01-11', detected: 15, prevented: 14 },
    { date: '2024-01-12', detected: 6, prevented: 6 },
    { date: '2024-01-13', detected: 19, prevented: 18 },
    { date: '2024-01-14', detected: 11, prevented: 10 },
    { date: '2024-01-15', detected: 23, prevented: 22 }
  ];

  const merchantRisk = [
    { name: 'Online Gaming', risk: 89, transactions: 245 },
    { name: 'Cryptocurrency', risk: 85, transactions: 89 },
    { name: 'Electronics', risk: 67, transactions: 567 },
    { name: 'Travel', risk: 54, transactions: 234 },
    { name: 'Restaurants', risk: 23, transactions: 1234 },
    { name: 'Grocery', risk: 12, transactions: 2345 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Analytics & Insights</h3>
        <div className="flex space-x-2">
          {['24h', '7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Detection Rate</p>
              <p className="text-2xl font-bold text-green-600">{fraudStats.detectionRate}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-xs text-green-600 mt-2">↗ +0.3% from last week</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">False Positive Rate</p>
              <p className="text-2xl font-bold text-orange-600">{fraudStats.falsePositiveRate}%</p>
            </div>
            <TrendingDown className="h-8 w-8 text-orange-600" />
          </div>
          <p className="text-xs text-green-600 mt-2">↓ -0.1% from last week</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Response Time</p>
              <p className="text-2xl font-bold text-blue-600">{fraudStats.avgResponseTime}s</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-xs text-green-600 mt-2">↓ -0.5s from last week</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Distribution */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <PieChart className="h-5 w-5 text-gray-600" />
            <h4 className="text-lg font-semibold text-gray-900">Risk Distribution</h4>
          </div>
          <div className="space-y-4">
            {riskDistribution.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.risk}</span>
                  <span className="font-medium">{item.count} transactions</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${item.color} transition-all duration-500`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <div className="text-right text-xs text-gray-500">{item.percentage}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Fraud Trends */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <BarChart3 className="h-5 w-5 text-gray-600" />
            <h4 className="text-lg font-semibold text-gray-900">Fraud Detection Trends</h4>
          </div>
          <div className="space-y-3">
            {fraudTrends.map((day, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{new Date(day.date).toLocaleDateString()}</span>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-900">{day.detected} detected</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-900">{day.prevented} prevented</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Merchant Risk Analysis */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Merchant Risk Analysis</h4>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Merchant Category</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Risk Score</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Transactions</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Risk Level</th>
              </tr>
            </thead>
            <tbody>
              {merchantRisk.map((merchant, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900">{merchant.name}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-900 font-medium">{merchant.risk}</span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            merchant.risk >= 70 ? 'bg-red-500' : 
                            merchant.risk >= 40 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${merchant.risk}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-900">{merchant.transactions.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      merchant.risk >= 70 ? 'bg-red-100 text-red-600' :
                      merchant.risk >= 40 ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'
                    }`}>
                      {merchant.risk >= 70 ? 'High' : merchant.risk >= 40 ? 'Medium' : 'Low'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Model Performance */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Model Performance Metrics</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">98.7%</div>
            <div className="text-sm text-gray-600">Accuracy</div>
            <div className="text-xs text-green-600 mt-1">↗ +0.2%</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">96.3%</div>
            <div className="text-sm text-gray-600">Precision</div>
            <div className="text-xs text-green-600 mt-1">↗ +0.5%</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">94.8%</div>
            <div className="text-sm text-gray-600">Recall</div>
            <div className="text-xs text-red-600 mt-1">↓ -0.1%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;