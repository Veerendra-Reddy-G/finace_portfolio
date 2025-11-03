// src/contexts/AppContext.js
import React, { createContext, useContext, useReducer } from 'react';
import { portfolioData, performanceData, holdingsData, mockTransactions } from '../utils/mockData';

const AppContext = createContext();

const initialState = {
  portfolioData,
  performanceData,
  holdingsData,
  transactions: mockTransactions,
  chatHistory: [],
  researchInProgress: false,
  currentResearchPlan: null,
};

function appReducer(state, action) {
  switch (action.type) {
    case 'ADD_CHAT_MESSAGE':
      return {
        ...state,
        chatHistory: [...state.chatHistory, action.payload],
      };
    case 'SET_RESEARCH_PLAN':
      return {
        ...state,
        currentResearchPlan: action.payload,
      };
    case 'START_RESEARCH':
      return {
        ...state,
        researchInProgress: true,
      };
    case 'COMPLETE_RESEARCH':
      return {
        ...state,
        researchInProgress: false,
        currentResearchPlan: null,
      };
    default:
      return state;
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};