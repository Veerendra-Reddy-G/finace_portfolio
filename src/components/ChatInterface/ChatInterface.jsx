 // src/components/ChatInterface/ChatInterface.jsx
import React, { useState, useRef, useEffect } from 'react';
import {
  Paper,
  TextField,
  IconButton,
  Box,
  Typography,
  Avatar,
  Chip
} from '@mui/material';
import { Send, SmartToy, Person, TrendingUp } from '@mui/icons-material';
import { useApp } from '../../contexts/AppContext';
import Message from './Message';
import ResearchPlan from './ResearchPlan';
import ProgressTracker from './ProgressTracker';

const ChatInterface = () => {
  const { state, dispatch } = useApp();
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.chatHistory]);

  // Static response for Nifty 50 analysis
  const nifty50Response = {
    content: `Here's a summary analysis of the NIFTY 50 (India) over the past six months — note: this is a high-level overview and not investment advice.

## Performance Overview

**NIFTY 50 is up +3.41% over the last 6 months** according to platform data. The index closed around 25,795 on recent trading sessions.

### Key Metrics
- **P/E Ratio**: ~22.7x
- **P/B Ratio**: ~3.5x  
- **Dividend Yield**: ~1.30%
- **YTD Return**: ~9.80%

## Market Interpretation

### Positive Factors
- **Domestic Growth**: Strong India GDP growth relative to global peers
- **Earnings Improvement**: Corporate earnings showing recovery in large-cap stocks
- **Foreign Inflows**: FIIs have resumed buying after period of outflows
- **Sectoral Opportunities**: Selective sectors showing strong outperformance

### Areas of Concern
- **Valuation Levels**: P/E of 22.7x suggests limited upside without strong catalysts
- **Global Headwinds**: US monetary policy and global growth concerns
- **Sectoral Weakness**: Some large sectors may drag overall performance
- **External Risks**: Geopolitical events and commodity price shocks

## Outlook & Recommendations

**Near-term Expectation (3-6 months):**
- Moderate upside potential (5-10%) if current trends continue
- Selective sector bets may offer better risk-reward
- Monitor earnings season and foreign flow data closely

**Key Monitoring Points:**
1. Quarterly earnings results
2. Foreign institutional investment flows
3. Global market sentiment and USD/INR movement
4. Domestic policy developments

*Last updated: ${new Date().toLocaleDateString()}*`,
    reasoning: "The analysis focuses on providing a balanced view of NIFTY 50 performance, considering both domestic strengths and global challenges. Emphasis is placed on realistic expectations given current valuation levels.",
    sources: [
      "Investing.com - Performance data",
      "Moneycontrol - YTD returns", 
      "Screener - Valuation metrics",
      "Reuters - Foreign flows analysis"
    ]
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    dispatch({ type: 'ADD_CHAT_MESSAGE', payload: userMessage });
    setInputMessage('');
    setIsTyping(true);

    // Check if it's a Nifty 50 query
    const isNiftyQuery = inputMessage.toLowerCase().includes('nifty') && 
                         (inputMessage.toLowerCase().includes('analysis') || 
                          inputMessage.toLowerCase().includes('last six months'));

    setTimeout(() => {
      if (isNiftyQuery) {
        // Direct response for Nifty 50 analysis
        const aiResponse = {
          id: Date.now() + 1,
          role: 'assistant',
          ...nifty50Response,
          timestamp: new Date()
        };
        dispatch({ type: 'ADD_CHAT_MESSAGE', payload: aiResponse });
        setIsTyping(false);
      } else {
        // Normal research flow for other queries
        const aiResponse = {
          id: Date.now() + 1,
          role: 'assistant',
          content: `I'll help you analyze "${inputMessage}". Let me create a research plan for this.`,
          timestamp: new Date(),
          researchPlan: {
            query: inputMessage,
            steps: [
              { id: 1, name: 'Understand query and context', status: 'completed', duration: '1s' },
              { id: 2, name: 'Identify relevant data sources', status: 'completed', duration: '2s' },
              { id: 3, name: 'Fetch current market data', status: 'pending', duration: null },
              { id: 4, name: 'Analyze financial ratios', status: 'pending', duration: null },
              { id: 5, name: 'Compare with sector peers', status: 'pending', duration: null },
              { id: 6, name: 'Generate comprehensive report', status: 'pending', duration: null }
            ]
          }
        };

        dispatch({ type: 'ADD_CHAT_MESSAGE', payload: aiResponse });
        dispatch({ type: 'SET_RESEARCH_PLAN', payload: aiResponse.researchPlan });
        setIsTyping(false);
      }
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Paper className="rounded-xl shadow-lg h-[calc(100vh-200px)] flex flex-col">
      {/* Enhanced Chat Header */}
      <Box className="p-4 border-b bg-gradient-to-r from-primary-50 to-purple-50 rounded-t-xl">
        <Box className="flex items-center justify-between">
          <Box className="flex items-center space-x-3">
            <Avatar className="bg-gradient-to-r from-primary-500 to-purple-500 w-10 h-10">
              <SmartToy className="text-white" />
            </Avatar>
            <Box>
              <Typography variant="h6" className="font-bold text-gray-800">
                AI Research Assistant
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                Powered by real-time market data and financial analytics
              </Typography>
            </Box>
          </Box>
          <Chip 
            icon={<TrendingUp />}
            label="Live Data" 
            color="success" 
            variant="outlined"
          />
        </Box>
      </Box>

      {/* Messages Container */}
      <Box className="flex-1 overflow-y-auto p-4 space-y-4">
        {state.chatHistory.length === 0 && (
          <Box className="text-center py-12 text-gray-500">
            <SmartToy className="text-6xl mb-4 text-gray-300 mx-auto" />
            <Typography variant="h6" className="mb-2 font-bold text-gray-600">
              Welcome to AI Research Assistant
            </Typography>
            <Typography variant="body2" className="max-w-md mx-auto">
              Ask me to analyze companies, sectors, or your portfolio performance. 
              Try: "Give me Nifty Fifty analysis for last six months"
            </Typography>
          </Box>
        )}

        {state.chatHistory.map((message) => (
          <Message key={message.id} message={message} />
        ))}

        {isTyping && (
          <Box className="flex items-start space-x-3">
            <Avatar className="bg-gradient-to-r from-primary-500 to-purple-500 w-8 h-8">
              <SmartToy className="text-white text-sm" />
            </Avatar>
            <Box className="bg-gray-100 rounded-2xl rounded-tl-none p-4 max-w-2xl">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </Box>
          </Box>
        )}

        <div ref={messagesEndRef} />
      </Box>

      {/* Research Plan Modal */}
      {state.currentResearchPlan && (
        <ResearchPlan 
          plan={state.currentResearchPlan}
          onApprove={() => dispatch({ type: 'START_RESEARCH' })}
          onModify={() => dispatch({ type: 'SET_RESEARCH_PLAN', payload: null })}
        />
      )}

      {/* Progress Tracker */}
      {state.researchInProgress && (
        <ProgressTracker 
          steps={state.currentResearchPlan?.steps || []}
          onComplete={() => dispatch({ type: 'COMPLETE_RESEARCH' })}
        />
      )}

      {/* Enhanced Input Area */}
      <Box className="p-4 border-t bg-gray-50 rounded-b-xl">
        <TextField
          fullWidth
          multiline
          maxRows={4}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me to analyze a company, sector, or your portfolio. Try: 'Give me Nifty Fifty analysis for last six months'"
          variant="outlined"
          size="medium"
          className="bg-white"
          InputProps={{
            endAdornment: (
              <IconButton 
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-gradient-to-r from-primary-500 to-purple-500 text-white hover:shadow-lg transition-all duration-200"
                size="large"
              >
                <Send className="text-white" />
              </IconButton>
            ),
            sx: {
              borderRadius: '12px',
              '&:hover': {
                boxShadow: '0 4px 12px rgba(14, 165, 233, 0.15)'
              }
            }
          }}
        />
      </Box>
    </Paper>
  );
};

export default ChatInterface;