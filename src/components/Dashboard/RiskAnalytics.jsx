// src/components/Dashboard/RiskAnalytics.jsx
import React from 'react';
import { Paper, Typography, Box, Grid, LinearProgress, Chip } from '@mui/material';
import { Warning, TrendingUp, TrendingDown, ShowChart } from '@mui/icons-material';
import { formatPercentage } from '../../utils/formatters';

const RiskAnalytics = ({ data }) => {
  // Mock risk metrics
  const riskMetrics = {
    volatility: 18.5,
    sharpeRatio: 1.2,
    beta: 1.1,
    maxDrawdown: -12.3,
    var95: -8.7,
  };

  const concentrationRisks = [
    { sector: 'Pharmaceuticals', allocation: 28.5, risk: 'High' },
    { sector: 'Technology', allocation: 22.1, risk: 'Medium' },
    { sector: 'Banking', allocation: 18.7, risk: 'Medium' },
    { sector: 'Automotive', allocation: 12.3, risk: 'Low' },
    { sector: 'Energy', allocation: 8.4, risk: 'Low' },
  ];

  const correlationMatrix = [
    { asset1: 'Large Cap', asset2: 'Mid Cap', correlation: 0.85 },
    { asset1: 'Large Cap', asset2: 'Small Cap', correlation: 0.72 },
    { asset1: 'Mid Cap', asset2: 'Small Cap', correlation: 0.91 },
  ];

  const getRiskColor = (value, type) => {
    if (type === 'volatility') {
      if (value < 15) return 'success';
      if (value < 25) return 'warning';
      return 'error';
    }
    if (type === 'sharpe') {
      if (value > 1.5) return 'success';
      if (value > 0.8) return 'warning';
      return 'error';
    }
    if (type === 'beta') {
      if (value < 0.9) return 'success';
      if (value < 1.2) return 'warning';
      return 'error';
    }
    return 'default';
  };

  const getRiskLevel = (risk) => {
    switch (risk) {
      case 'High': return 'error';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'default';
    }
  };

  return (
    <Paper className="p-6 rounded-xl shadow-lg">
      <Typography variant="h6" className="font-bold mb-4 flex items-center">  
      <div  style={{marginLeft:"10px", marginTop:"10px"}} >   
        Risk Analytics
        </div>
      </Typography>

      <Grid container spacing={3}>
        {/* Key Risk Metrics */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" className="font-semibold mb-3">
            Portfolio Risk Metrics
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} md={4}>
              <Box className="text-center p-3 border rounded-lg">
                <Typography variant="body2" className="text-gray-600 mb-1">
                  Volatility
                </Typography>
                <Chip
                  label={`${riskMetrics.volatility}%`}
                  color={getRiskColor(riskMetrics.volatility, 'volatility')}
                  size="small"
                />
              </Box>
            </Grid>
            <Grid item xs={6} md={4}>
              <Box className="text-center p-3 border rounded-lg">
                <Typography variant="body2" className="text-gray-600 mb-1">
                  Sharpe Ratio
                </Typography>
                <Chip
                  label={riskMetrics.sharpeRatio.toFixed(2)}
                  color={getRiskColor(riskMetrics.sharpeRatio, 'sharpe')}
                  size="small"
                />
              </Box>
            </Grid>
            <Grid item xs={6} md={4}>
              <Box className="text-center p-3 border rounded-lg">
                <Typography variant="body2" className="text-gray-600 mb-1">
                  Beta
                </Typography>
                <Chip
                  label={riskMetrics.beta.toFixed(2)}
                  color={getRiskColor(riskMetrics.beta, 'beta')}
                  size="small"
                />
              </Box>
            </Grid>
            <Grid item xs={6} md={6}>
              <Box className="text-center p-3 border rounded-lg">
                <Typography variant="body2" className="text-gray-600 mb-1">
                  Max Drawdown
                </Typography>
                <Chip
                  icon={<TrendingDown />}
                  label={`${riskMetrics.maxDrawdown}%`}
                  color="error"
                  variant="outlined"
                  size="small"
                />
              </Box>
            </Grid>
            <Grid item xs={6} md={6}>
              <Box className="text-center p-3 border rounded-lg">
                <Typography variant="body2" className="text-gray-600 mb-1">
                  VaR (95%)
                </Typography>
                <Chip
                  icon={<Warning />}
                  label={`${riskMetrics.var95}%`}
                  color="warning"
                  variant="outlined"
                  size="small"
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>

        {/* Concentration Risk */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" className="font-semibold mb-3">
            Sector Concentration
          </Typography>
          <Box className="space-y-3">
            {concentrationRisks.map((sector, index) => (
              <Box key={index} className="flex items-center justify-between">
                <Box className="flex-1">
                  <Typography variant="body2" className="font-medium">
                    {sector.sector}
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={sector.allocation} 
                    className="h-2 mt-1"
                    color={getRiskLevel(sector.risk)}
                  />
                </Box>
                <Box className="text-right ml-3">
                  <Typography variant="body2" className="font-medium">
                    {formatPercentage(sector.allocation / 100)}
                  </Typography>
                  <Chip
                    label={sector.risk}
                    color={getRiskLevel(sector.risk)}
                    size="small"
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </Grid>

        {/* Correlation Matrix */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" className="font-semibold mb-3">
            Asset Correlation
          </Typography>
          <Box className="space-y-2">
            {correlationMatrix.map((correlation, index) => (
              <Box key={index} className="flex items-center justify-between p-2 border rounded">
                <Typography variant="body2" className="font-medium">
                  {correlation.asset1} ↔ {correlation.asset2}
                </Typography>
                <Chip
                  icon={<ShowChart />}
                  label={correlation.correlation.toFixed(2)}
                  color={correlation.correlation > 0.8 ? 'warning' : 'default'}
                  size="small"
                  variant="outlined"
                />
              </Box>
            ))}
          </Box>
          <Typography variant="caption" className="text-gray-600 mt-2 block">
            High correlation (lessthan 0.8) indicates similar price movements
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RiskAnalytics;