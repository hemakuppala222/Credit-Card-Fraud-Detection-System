import React, { useState } from 'react';
import { AlertTriangle, X, Check, Eye, Clock } from 'lucide-react';

interface FraudAlert {
  id: string;
  type: 'velocity' | 'location' | 'amount' | 'pattern';
  severity: 'high' | 'medium' | 'low';
  description: string;
  transactionId: string;
  amount: number;
  timestamp: string;
  status: 'active' | 'investigating' | 'resolved' | 'dismissed';
  riskFactors: string[];
}

const FraudAlerts: React.FC = () => {
  const [alerts, setAlerts] = useState<FraudAlert[]>([
    {
      id: 'alert_001',
      type: 'velocity',
      severity: 'high',
      description: 'Multiple transactions within 5 minutes from different locations',
      transactionId: 'txn_1234567890',
      amount: 2500.00,
      timestamp: '2024-01-15 14:23:45',
      status: 'active',
      riskFactors: ['High velocity', 'Geographic anomaly', 'Unusual amount']
    },
    {
      id: 'alert_002',
      type: 'amount',
      severity: 'medium',
      description: 'Transaction amount significantly higher than user average',
      transactionId: 'txn_1234567891',
      amount: 8900.00,
      timestamp: '2024-01-15 14:18:32',
      status: 'investigating',
      riskFactors: ['Unusual amount', 'New merchant type']
    },
    {
      id: 'alert_003',
      type: 'location',
      severity: 'high',
      description: 'Transaction from high-risk geographic location',
      transactionId: 'txn_1234567892',
      amount: 450.00,
      timestamp: '2024-01-15 14:15:21',
      status: 'active',
      riskFactors: ['High-risk location', 'Time anomaly']
    },
    {
      id: 'alert_004',
      type: 'pattern',
      severity: 'low',
      description: 'Unusual spending pattern detected',
      transactionId: 'txn_1234567893',
      amount: 125.00,
      timestamp: '2024-01-15 14:10:15',
      status: 'resolved',
      riskFactors: ['Pattern deviation']
    }
  ]);

  const [selectedAlert, setSelectedAlert] = useState<FraudAlert | null>(null);

  const updateAlertStatus = (alertId: string, newStatus: FraudAlert['status']) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, status: newStatus } : alert
    ));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-600 bg-red-100 border-red-200';
      case 'medium':
        return 'text-orange-600 bg-orange-100 border-orange-200';
      default:
        return 'text-yellow-600 bg-yellow-100 border-yellow-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-red-600 bg-red-100';
      case 'investigating':
        return 'text-blue-600 bg-blue-100';
      case 'resolved':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    return <AlertTriangle className="h-5 w-5" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Fraud Alerts</h3>
        <div className="flex space-x-2">
          <div className="text-sm text-gray-600">
            Active: <span className="font-semibold text-red-600">{alerts.filter(a => a.status === 'active').length}</span>
          </div>
          <div className="text-sm text-gray-600">
            Investigating: <span className="font-semibold text-blue-600">{alerts.filter(a => a.status === 'investigating').length}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`border rounded-lg p-4 ${getSeverityColor(alert.severity)} hover:shadow-md transition-shadow cursor-pointer`}
            onClick={() => setSelectedAlert(alert)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                {getTypeIcon(alert.type)}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-gray-900">{alert.type.toUpperCase()} ALERT</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                      {alert.severity.toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                      {alert.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-2">{alert.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>Transaction: {alert.transactionId}</span>
                    <span>Amount: ${alert.amount.toLocaleString()}</span>
                    <span>{alert.timestamp}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {alert.riskFactors.map((factor, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs">
                        {factor}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                {alert.status === 'active' && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateAlertStatus(alert.id, 'investigating');
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                      title="Start Investigation"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateAlertStatus(alert.id, 'dismissed');
                      }}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                      title="Dismiss"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </>
                )}
                {alert.status === 'investigating' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateAlertStatus(alert.id, 'resolved');
                    }}
                    className="p-2 text-green-600 hover:bg-green-100 rounded-full transition-colors"
                    title="Mark Resolved"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Alert Detail Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Alert Details</h3>
              <button
                onClick={() => setSelectedAlert(null)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Alert Type</label>
                  <p className="text-gray-900">{selectedAlert.type.toUpperCase()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Severity</label>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(selectedAlert.severity)}`}>
                    {selectedAlert.severity.toUpperCase()}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Transaction ID</label>
                  <p className="text-gray-900">{selectedAlert.transactionId}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Amount</label>
                  <p className="text-gray-900">${selectedAlert.amount.toLocaleString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Timestamp</label>
                  <p className="text-gray-900">{selectedAlert.timestamp}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedAlert.status)}`}>
                    {selectedAlert.status.toUpperCase()}
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedAlert.description}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Risk Factors</label>
                <div className="flex flex-wrap gap-2">
                  {selectedAlert.riskFactors.map((factor, index) => (
                    <span key={index} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                      {factor}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FraudAlerts;