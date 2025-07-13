import React, { useState, useEffect } from 'react';
import { AlertTriangle, Shield, TrendingUp, CreditCard, Eye, RefreshCw } from 'lucide-react';
import TransactionMonitor from './TransactionMonitor';
import FraudAlerts from './FraudAlerts';
import Analytics from './Analytics';
import TransactionDetails from './TransactionDetails';

interface DashboardStats {
  totalTransactions: number;
  fraudDetected: number;
  riskScore: number;
  modelAccuracy: number;
}

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('monitor');
  const [stats, setStats] = useState<DashboardStats>({
    totalTransactions: 1247,
    fraudDetected: 23,
    riskScore: 7.3,
    modelAccuracy: 98.7
  });
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshData = async () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setStats(prev => ({
        ...prev,
        totalTransactions: prev.totalTransactions + Math.floor(Math.random() * 10),
        fraudDetected: prev.fraudDetected + Math.floor(Math.random() * 3),
        riskScore: Math.round((Math.random() * 10 + 5) * 10) / 10,
      }));
      setIsRefreshing(false);
    }, 1000);
  };

  useEffect(() => {
    const interval = setInterval(refreshData, 30000);
    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: 'monitor', label: 'Live Monitor', icon: Eye },
    { id: 'alerts', label: 'Fraud Alerts', icon: AlertTriangle },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'details', label: 'Transaction Details', icon: CreditCard }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Fraud Detection System</h1>
              <p className="text-gray-600">Real-time credit card transaction monitoring</p>
            </div>
          </div>
          <button
            onClick={refreshData}
            disabled={isRefreshing}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Transactions</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalTransactions.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-green-600">↗ +12% from yesterday</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Fraud Detected</p>
                <p className="text-2xl font-bold text-red-600">{stats.fraudDetected}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-red-600">↗ +3 in last hour</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Risk Score</p>
                <p className="text-2xl font-bold text-amber-600">{stats.riskScore}/10</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-amber-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(stats.riskScore / 10) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Model Accuracy</p>
                <p className="text-2xl font-bold text-green-600">{stats.modelAccuracy}%</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-green-600">↗ +0.3% this week</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="flex space-x-0 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'monitor' && <TransactionMonitor />}
            {activeTab === 'alerts' && <FraudAlerts />}
            {activeTab === 'analytics' && <Analytics />}
            {activeTab === 'details' && <TransactionDetails />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;