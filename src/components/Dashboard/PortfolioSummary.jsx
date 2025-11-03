// src/components/Dashboard/PortfolioSummary.jsx
import React from 'react';
import { Paper, Grid, Typography, Box, Chip } from '@mui/material';
import { TrendingUp, TrendingDown, AccountBalance, PieChart } from '@mui/icons-material';
import { formatCurrency, formatPercentage, getColorForValue } from '../../utils/formatters';

const PortfolioSummary = ({ data }) => {
  const totalValue = data.live_portfolio_info.total_market_value;
  const dayChange = 1.2; // Mock data
  const dayChangeAmount = totalValue * (dayChange / 100);
  const overallPnL = -4970587.90; // From holdings data

  const topGainers = [
    { name: 'ETERNAL', change: 56.84 },
    { name: 'LAURUS LABS', change: 50.57 },
    { name: 'CENTRAL DEPO', change: 26.52 }
  ];

  const topLosers = [
    { name: 'AKUMS DRUGS', change: -49.03 },
    { name: 'CONTAINER CORP', change: -49.44 },
    { name: 'RELIANCE', change: -52.35 }
  ];

  return (
    <Paper className="p-8 rounded-xl shadow-lg">
      {/* <Typography variant="h5" className="font-bold mb-6 mt-10 flex items-center">
        <AccountBalance className="mr-2  mt-10" />
        Portfolio Overview
      </Typography> */}

      <Grid container spacing={4}>
        {/* Total Value and Changes */}
        <Grid item xs={12} md={4}>
          <Box className="text-center p-4 border rounded-lg">
            <Typography variant="h4" className="font-bold mb-2">
              {formatCurrency(totalValue)}
            </Typography>
            <Typography variant="body2" className="text-gray-600 mb-2">
              Total Portfolio Value
            </Typography>
            <Chip
              icon={dayChange >= 0 ? <TrendingUp /> : <TrendingDown />}
              label={`${dayChange >= 0 ? '+' : ''}${dayChange}% (${formatCurrency(dayChangeAmount)})`}
              color={dayChange >= 0 ? 'success' : 'error'}
              variant="outlined"
            />
          </Box>
        </Grid>

        {/* Overall P&L */}
        <Grid item xs={12} md={4}>
          <Box className="text-center p-4 border rounded-lg">
            <Typography 
              variant="h4" 
              className={`font-bold mb-2 ${getColorForValue(overallPnL)}`}
            >
              {formatCurrency(overallPnL)}
            </Typography>
            <Typography variant="body2" className="text-gray-600 mb-2">
              Unrealized P&L
            </Typography>
            <Typography 
              variant="body2" 
              className={getColorForValue(overallPnL)}
            >
              {formatPercentage(overallPnL / data.live_portfolio_info.total_market_value)}
            </Typography>
          </Box>
        </Grid>

        {/* Asset Allocation Summary */}
        <Grid item xs={12} md={4}>
          <Box className="text-center p-4 border rounded-lg">
            <Typography variant="h6" className="font-bold mb-2 flex items-center justify-center">
              <PieChart className="mr-2" />
              Asset Allocation
            </Typography>
            <Typography variant="body2" className="text-primary-600 font-semibold">
              Equity: 100%
            </Typography>
            <Typography variant="caption" className="text-gray-600">
              Large: 36.8% | Mid: 33.9% | Small: 29.4%
            </Typography>
          </Box>
        </Grid>

        {/* Top Gainers */}
        <Grid item xs={12} md={6}>
          <Paper className="p-4 border-l-4 border-l-success-500">
            <Typography variant="h6" className="font-bold mb-3 text-success-600">
              Top Gainers
            </Typography>
            <div className="space-y-2">
              {topGainers.map((stock, index) => (
                <div key={index} className="flex justify-between items-center">
                  <Typography variant="body2" className="font-medium">
                    {stock.name}
                  </Typography>
                  <Chip
                    label={`+${stock.change}%`}
                    color="success"
                    size="small"
                  />
                </div>
              ))}
            </div>
          </Paper>
        </Grid>

        {/* Top Losers */}
        <Grid item xs={12} md={6}>
          <Paper className="p-4 border-l-4 border-l-danger-500">
            <Typography variant="h6" className="font-bold mb-3 text-danger-600">
              Top Losers
            </Typography>
            <div className="space-y-2">
              {topLosers.map((stock, index) => (
                <div key={index} className="flex justify-between items-center">
                  <Typography variant="body2" className="font-medium">
                    {stock.name}
                  </Typography>
                  <Chip
                    label={`${stock.change}%`}
                    color="error"
                    size="small"
                  />
                </div>
              ))}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PortfolioSummary;