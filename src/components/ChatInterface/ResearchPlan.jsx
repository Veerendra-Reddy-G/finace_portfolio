// src/components/ChatInterface/ResearchPlan.jsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Chip,
  Paper
} from '@mui/material';
import { Checklist, Analytics, DataObject, Calculate, Assessment } from '@mui/icons-material';

const ResearchPlan = ({ plan, onApprove, onModify }) => {
  const getStepIcon = (stepName) => {
    if (stepName.includes('financial') || stepName.includes('ratio')) 
      return <Calculate />;
    if (stepName.includes('data') || stepName.includes('fetch')) 
      return <DataObject />;
    if (stepName.includes('analyze') || stepName.includes('compare')) 
      return <Analytics />;
    if (stepName.includes('report') || stepName.includes('assessment')) 
      return <Assessment />;
    return <Checklist />;
  };

  const dataSources = [
    { type: 'Financial Statements', source: 'Company Filings', reliability: 'High' },
    { type: 'Market Data', source: 'Real-time APIs', reliability: 'High' },
    { type: 'News & Sentiment', source: 'News Aggregators', reliability: 'Medium' },
    { type: 'Sector Data', source: 'Industry Reports', reliability: 'High' },
  ];

  return (
    <Dialog 
      open={true} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        className: 'rounded-2xl'
      }}
    >
      <DialogTitle className="bg-gradient-to-r from-primary-50 to-blue-50">
        <Typography variant="h6" className="font-bold flex items-center">
          <Checklist className="mr-2 text-primary-600" />
          Research Plan Approval
        </Typography>
      </DialogTitle>

      <DialogContent className="mt-4">
        <Typography variant="body1" className="mb-4">
          I'll analyze: <strong>"{plan.query}"</strong>
        </Typography>

        {/* Research Steps */}
        <Stepper orientation="vertical" className="mb-6">
          {plan.steps.map((step, index) => (
            <Step key={step.id} active={step.status === 'completed'}>
              <StepLabel 
                icon={getStepIcon(step.name)}
                className="font-medium"
              >
                {step.name}
              </StepLabel>
              <StepContent>
                <Typography variant="body2" className="text-gray-600">
                  {step.description || 'This step will gather and analyze relevant data for comprehensive insights.'}
                </Typography>
                {step.estimatedTime && (
                  <Chip 
                    label={`Estimated: ${step.estimatedTime}`} 
                    size="small" 
                    className="mt-2"
                  />
                )}
              </StepContent>
            </Step>
          ))}
        </Stepper>

        {/* Data Sources */}
        <Paper className="p-3 border rounded-lg mb-4">
          <Typography variant="h6" className="font-bold mb-3">
            Data Sources
          </Typography>
          <Box className="space-y-2">
            {dataSources.map((source, index) => (
              <Box key={index} className="flex justify-between items-center">
                <Box>
                  <Typography variant="body2" className="font-medium">
                    {source.type}
                  </Typography>
                  <Typography variant="caption" className="text-gray-600">
                    {source.source}
                  </Typography>
                </Box>
                <Chip 
                  label={source.reliability} 
                  size="small"
                  color={source.reliability === 'High' ? 'success' : 'default'}
                />
              </Box>
            ))}
          </Box>
        </Paper>

        {/* Expected Output */}
        <Paper className="p-3 border rounded-lg">
          <Typography variant="h6" className="font-bold mb-2">
            Expected Output
          </Typography>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
            <li>Comprehensive financial analysis with key metrics</li>
            <li>Sector comparison and peer analysis</li>
            <li>Risk assessment and investment considerations</li>
            <li>Source attribution for all data points</li>
            <li>Interactive charts and visualizations</li>
          </ul>
        </Paper>
      </DialogContent>

      <DialogActions className="p-4 border-t">
        <Button onClick={onModify} variant="outlined">
          Modify Scope
        </Button>
        <Button onClick={onApprove} variant="contained" color="primary">
          Start Research
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResearchPlan;