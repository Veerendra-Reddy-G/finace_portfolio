 // src/components/Dashboard/Dashboard.jsx - Add enhanced styling classes
import React from 'react';
import { Grid } from '@mui/material';
import { useApp } from '../../contexts/AppContext';
import PortfolioSummary from './PortfolioSummary';
import HoldingsTable from './HoldingsTable';
import PerformanceCharts from './PerformanceCharts';
import AllocationCharts from './AllocationCharts';
import RiskAnalytics from './RiskAnalytics';
import TransactionHistory from './TransactionHistory';

const Dashboard = () => {
  const { state } = useApp();
  const { portfolioData, performanceData, holdingsData } = state;

  return (
    <div className="space-y-8">
      {/* Enhanced Portfolio Summary */}
      <div className="card-hover">
        <PortfolioSummary data={portfolioData} />
      </div>

      <Grid container spacing={4}>
        {/* Performance Charts with enhanced styling */}
        <Grid item xs={12} lg={8}>
          <div className="chart-container card-hover p-1">
            <PerformanceCharts data={performanceData} />
          </div>
        </Grid>

        {/* Allocation Charts with enhanced styling */}
        <Grid item xs={12} lg={4}>
          <div className="chart-container card-hover p-1">
            <AllocationCharts data={portfolioData} />
          </div>
        </Grid>

        {/* Holdings Table */}
        <Grid item xs={12}>
          <div className="card-hover">
            <HoldingsTable data={holdingsData} />
          </div>
        </Grid>

        {/* Risk Analytics */}
        <Grid item xs={12} lg={6}>
          <div className="card-hover">
            <RiskAnalytics data={performanceData} />
          </div>
        </Grid>

        {/* Transaction History */}
        <Grid item xs={12} lg={6}>
          <div className="card-hover">
            <TransactionHistory />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;