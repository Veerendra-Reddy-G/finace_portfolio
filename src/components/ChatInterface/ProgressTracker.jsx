// src/components/ChatInterface/ProgressTracker.jsx
import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Box,
  LinearProgress,
  Chip,
  Collapse,
  IconButton
} from '@mui/material';
import { Close, CheckCircle, PlayCircle, Schedule } from '@mui/icons-material';

const ProgressTracker = ({ steps, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentStep < steps.length) {
        // Simulate step completion
        setCompletedSteps(prev => [...prev, currentStep]);
        setCurrentStep(prev => prev + 1);
      } else {
        clearInterval(timer);
        setTimeout(onComplete, 1000);
      }
    }, 2000);

    return () => clearInterval(timer);
  }, [currentStep, steps.length, onComplete]);

  const progress = (completedSteps.length / steps.length) * 100;

  const getStepStatus = (index) => {
    if (completedSteps.includes(index)) return 'completed';
    if (index === currentStep) return 'in-progress';
    return 'pending';
  };

  const getStepIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-success-500" />;
      case 'in-progress':
        return <PlayCircle className="text-primary-500 animate-pulse" />;
      default:
        return <Schedule className="text-gray-400" />;
    }
  };

  return (
    <Paper className="m-4 p-4 border-l-4 border-l-primary-500 shadow-lg">
      <Box className="flex justify-between items-center mb-4">
        <Typography variant="h6" className="font-bold">
          Research in Progress
        </Typography>
        <Typography variant="body2" className="text-gray-600">
          {Math.round(progress)}% Complete
        </Typography>
      </Box>

      <LinearProgress 
        variant="determinate" 
        value={progress} 
        className="mb-4 h-2 rounded"
      />

      <Box className="space-y-3">
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          return (
            <Collapse key={step.id} in={true}>
              <Box className={`flex items-center space-x-3 p-2 rounded-lg ${
                status === 'in-progress' ? 'bg-primary-50 border border-primary-200' : ''
              }`}>
                <Box className="flex-shrink-0">
                  {getStepIcon(status)}
                </Box>
                <Box className="flex-1">
                  <Typography 
                    variant="body2" 
                    className={`font-medium ${
                      status === 'completed' ? 'text-gray-600' : 
                      status === 'in-progress' ? 'text-primary-700' : 'text-gray-500'
                    }`}
                  >
                    {step.name}
                  </Typography>
                  {step.duration && (
                    <Typography variant="caption" className="text-gray-500">
                      Completed in {step.duration}
                    </Typography>
                  )}
                </Box>
                <Chip
                  label={
                    status === 'completed' ? 'Completed' :
                    status === 'in-progress' ? 'In Progress' : 'Pending'
                  }
                  size="small"
                  color={
                    status === 'completed' ? 'success' :
                    status === 'in-progress' ? 'primary' : 'default'
                  }
                  variant={status === 'pending' ? 'outlined' : 'filled'}
                />
              </Box>
            </Collapse>
          );
        })}
      </Box>
    </Paper>
  );
};

export default ProgressTracker;