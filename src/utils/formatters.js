// src/utils/formatters.js
export const formatCurrency = (value, currency = 'INR') => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  export const formatPercentage = (value, decimals = 2) => {
    return `${(value * 100).toFixed(decimals)}%`;
  };
  
  export const formatNumber = (value, decimals = 0) => {
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  };
  
  export const getColorForValue = (value, type = 'pnl') => {
    if (type === 'pnl') {
      return value >= 0 ? 'text-success-600' : 'text-danger-600';
    }
    return value >= 0 ? 'text-green-600' : 'text-red-600';
  };
  
  export const getBgColorForValue = (value) => {
    return value >= 0 ? 'bg-success-50' : 'bg-danger-50';
  };