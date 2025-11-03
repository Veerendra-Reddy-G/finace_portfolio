// src/components/Dashboard/PerformanceCharts.jsx
import React, { useState } from 'react';
import { Paper, Typography, Box, Tabs, Tab, Grid } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

const PerformanceCharts = ({ data }) => {
  const [tabValue, setTabValue] = useState(0);

  // Mock performance data
  const performanceOverTime = [
    { date: 'Jan', portfolio: 200000000, benchmark: 190000000 },
    { date: 'Feb', portfolio: 205000000, benchmark: 195000000 },
    { date: 'Mar', portfolio: 198000000, benchmark: 192000000 },
    { date: 'Apr', portfolio: 210000000, benchmark: 198000000 },
    { date: 'May', portfolio: 208000000, benchmark: 202000000 },
    { date: 'Jun', portfolio: 213534049, benchmark: 205000000 },
  ];

  const sectorPerformance = [
    { name: 'Large Cap', value: -3.54, allocation: 36.76 },
    { name: 'Mid Cap', value: 20.14, allocation: 33.85 },
    { name: 'Small Cap', value: 2.48, allocation: 29.39 },
  ];

  const returnsByCategory = [
    { category: 'Technology', return: 12.5, contribution: 2.1 },
    { category: 'Pharmaceuticals', return: -8.2, contribution: -1.5 },
    { category: 'Banking', return: 15.3, contribution: 3.2 },
    { category: 'Energy', return: -5.7, contribution: -0.8 },
    { category: 'Automotive', return: 22.1, contribution: 4.1 },
  ];

  const COLORS = ['#0ea5e9', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Paper className="p-3 shadow-lg border">
          <Typography variant="body2" className="font-bold mb-1">
            {label}
          </Typography>
          {payload.map((entry, index) => (
            <Typography 
              key={index} 
              variant="body2" 
              style={{ color: entry.color }}
            >
              {entry.name}: {formatCurrency(entry.value)}
            </Typography>
          ))}
        </Paper>
      );
    }
    return null;
  };

  return (
    <Paper className="p-6 rounded-xl shadow-lg">
      <Box className="flex justify-between items-center mb-6">
        <Typography variant="h6" className="font-bold">
          Performance Analytics
        </Typography>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label="Portfolio Growth" />
          <Tab label="Sector Performance" />
          <Tab label="Returns Attribution" />
        </Tabs>
      </Box>

      {tabValue === 0 && (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={performanceOverTime}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis tickFormatter={value => formatCurrency(value)} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="portfolio" 
              stroke="#0ea5e9" 
              strokeWidth={3}
              name="Your Portfolio"
              dot={{ fill: '#0ea5e9' }}
            />
            <Line 
              type="monotone" 
              dataKey="benchmark" 
              stroke="#94a3b8" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Nifty 50"
              dot={{ fill: '#94a3b8' }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}

      {tabValue === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" className="text-center mb-4">
              XIRR by Category
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sectorPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={value => `${value}%`} />
                <Tooltip />
                <Bar dataKey="value" name="XIRR (%)">
                  {sectorPerformance.map((entry, index) => (
                    <Cell 
                      key={index} 
                      fill={entry.value >= 0 ? '#10b981' : '#ef4444'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" className="text-center mb-4">
              Allocation Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sectorPerformance}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="allocation"
                >
                  {sectorPerformance.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>
      )}

      {tabValue === 2 && (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={returnsByCategory} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" tickFormatter={value => `${value}%`} />
            <YAxis type="category" dataKey="category" width={100} />
            <Tooltip />
            <Legend />
            <Bar 
              dataKey="return" 
              name="Return (%)" 
              fill="#0ea5e9"
              radius={[0, 4, 4, 0]}
            />
            <Bar 
              dataKey="contribution" 
              name="Contribution to Portfolio (%)" 
              fill="#10b981"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Paper>
  );
};

export default PerformanceCharts;