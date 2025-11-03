// src/components/Dashboard/AllocationCharts.jsx
import React, { useState } from 'react';
import { Paper, Typography, Box, Tabs, Tab, Chip } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { formatPercentage } from '../../utils/formatters';

const AllocationCharts = ({ data }) => {
  const [tabValue, setTabValue] = useState(0);

  // Current allocation data from portfolio
  const currentAllocation = [
    { name: 'Large Cap', value: 36.76, color: '#0ea5e9' },
    { name: 'Mid Cap', value: 33.85, color: '#8b5cf6' },
    { name: 'Small Cap', value: 29.39, color: '#10b981' },
  ];

  // Target allocation data
  const targetAllocation = [
    { name: 'Large Cap', value: 75.17, color: '#0ea5e9' },
    { name: 'Mid Cap', value: 1.33, color: '#8b5cf6' },
    { name: 'Small Cap', value: 0.31, color: '#10b981' },
    { name: 'Debt', value: 10.0, color: '#f59e0b' },
    { name: 'Commodities', value: 5.0, color: '#ef4444' },
    { name: 'Alternatives', value: 8.0, color: '#ec4899' },
  ];

  // Rebalancing actions
  const rebalancingActions = [
    { asset: 'Large Cap', current: 36.76, target: 75.17, difference: 38.41, action: 'BUY' },
    { asset: 'Mid Cap', current: 33.85, target: 1.33, difference: -32.52, action: 'SELL' },
    { asset: 'Small Cap', current: 29.39, target: 0.31, difference: -29.08, action: 'SELL' },
    { asset: 'Debt', current: 0, target: 10.0, difference: 10.0, action: 'BUY' },
    { asset: 'Commodities', current: 0, target: 5.0, difference: 5.0, action: 'BUY' },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <Paper className="p-3 shadow-lg border">
          <Typography variant="body2" className="font-bold">
            {payload[0].name}
          </Typography>
          <Typography variant="body2" style={{ color: payload[0].color }}>
            Allocation: {formatPercentage(payload[0].value / 100)}
          </Typography>
        </Paper>
      );
    }
    return null;
  };

  return (
    <Paper className="p-6 rounded-xl shadow-lg h-full">
      <Typography variant="h6" className="font-bold mb-4">
        Asset Allocation
      </Typography>

      <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} className="mb-4">
        <Tab label="Current" />
        <Tab label="Target" />
        <Tab label="Rebalancing" />
      </Tabs>

      {tabValue === 0 && (
        <Box className="text-center">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={currentAllocation}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
              >
                {currentAllocation.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <Typography variant="body2" className="text-gray-600 mt-4">
            Total Equity: 100%
          </Typography>
        </Box>
      )}

      {tabValue === 1 && (
        <Box className="text-center">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={targetAllocation}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
              >
                {targetAllocation.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <Typography variant="body2" className="text-gray-600 mt-4">
            Diversified Portfolio Target
          </Typography>
        </Box>
      )}

      {tabValue === 2 && (
        <Box>
          <Typography variant="body2" className="text-gray-600 mb-4">
            Actions needed to reach target allocation
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={rebalancingActions} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tickFormatter={value => `${value}%`} />
              <YAxis type="category" dataKey="asset" width={80} />
              <Tooltip formatter={(value) => [`${value}%`, 'Difference']} />
              <Bar dataKey="difference" name="Difference">
                {rebalancingActions.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.action === 'BUY' ? '#10b981' : '#ef4444'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <Box className="flex flex-wrap gap-2 mt-4">
            {rebalancingActions.slice(0, 3).map((action, index) => (
              <Chip
                key={index}
                label={`${action.action} ${action.asset}`}
                color={action.action === 'BUY' ? 'success' : 'error'}
                size="small"
                variant="outlined"
              />
            ))}
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default AllocationCharts;