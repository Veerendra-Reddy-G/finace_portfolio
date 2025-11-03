 // src/App.jsx
import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar, Toolbar, Typography, Switch, Box, Tabs, Tab, Chip } from '@mui/material';
import { LightMode, DarkMode, Analytics, Chat, AccountBalance} from '@mui/icons-material';
import { AppProvider } from './contexts/AppContext';
import ChatInterface from './components/ChatInterface/ChatInterface';
import Dashboard from './components/Dashboard/Dashboard';
import './styles/index.css';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#0ea5e9',
        light: '#38bdf8',
        dark: '#0284c7',
      },
      secondary: {
        main: '#8b5cf6',
        light: '#a78bfa',
        dark: '#7c3aed',
      },
      background: {
        default: darkMode ? '#0f172a' : '#f8fafc',
        paper: darkMode ? '#1e293b' : '#ffffff',
      },
    },
    typography: {
      fontFamily: 'Inter, system-ui, sans-serif',
      h4: {
        fontWeight: 700,
        letterSpacing: '-0.025em',
      },
      h5: {
        fontWeight: 600,
        letterSpacing: '-0.025em',
      },
      h6: {
        fontWeight: 600,
        letterSpacing: '-0.025em',
      },
    },
    shape: {
      borderRadius: 12,
    },
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <CssBaseline />
        <div className={`min-h-screen transition-all duration-300 ${
          darkMode 
            ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white' 
            : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900'
        }`}>
          
          {/* Enhanced Beautiful Header */}
          <AppBar 
            position="sticky"
            className={`shadow-2xl border-b backdrop-blur-lg ${
              darkMode 
                ? 'bg-gradient-to-r from-slate-800/95 to-slate-900/95 border-slate-700' 
                : 'bg-gradient-to-r from-blue-600/95 to-purple-600/95 border-blue-200'
            }`}
            elevation={0}
          >
            <Toolbar className="min-h-16 py-3 px-6" >
              
              {/* Left Section - Logo with Enhanced Design */}
              <Box className="flex items-center mr-8" >
                {/* <Box className="relative">
                  <Box className={`absolute -inset-1 rounded-lg blur opacity-30 ${
                    darkMode ? 'bg-blue-500' : 'bg-white'
                  }`}></Box>
                  <AccountBalance className={`relative z-10 mr-3 text-2xl ${
                    darkMode ? 'text-blue-300' : 'text-white'
                  }`} />
                </Box> */}
                <Typography 
                  variant="h5" 
                  className={`font-bold tracking-tight bg-gradient-to-r ${
                    darkMode 
                      ? 'from-blue-300 to-purple-300' 
                      : 'from-white to-blue-100'
                  } bg-clip-text text-transparent`}
                >
                  FinIntel AI
                </Typography>
                
              </Box>

              {/* Center Section - Enhanced Navigation Tabs */}
              <Box className="flex-1 flex justify-center">
                <Tabs 
                  value={activeTab} 
                  onChange={handleTabChange} 
                  className="min-h-12"
                  TabIndicatorProps={{
                    style: {
                      background: 'linear-gradient(90deg, #38bdf8, #a78bfa)',
                      height: '3px',
                      borderRadius: '3px',
                      boxShadow: '0 2px 8px rgba(139, 92, 246, 0.3)',
                    }
                  }}
                  sx={{
                    '& .MuiTab-root': {
                      color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.8)',
                      fontWeight: 500,
                      fontSize: '0.9rem',
                      textTransform: 'none',
                      minHeight: '48px',
                      margin: '0 8px',
                      padding: '8px 20px',
                      borderRadius: '8px',
                      transition: 'all 0.3s ease',
                      '&.Mui-selected': {
                        color: '#ffffff',
                        fontWeight: 600,
                        background: darkMode 
                          ? 'linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(139, 92, 246, 0.2))' 
                          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))',
                        backdropFilter: 'blur(10px)',
                      },
                      '&:hover': {
                        color: '#ffffff',
                        background: darkMode 
                          ? 'linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(139, 92, 246, 0.15))' 
                          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))',
                        transform: 'translateY(-1px)',
                      }
                    }
                  }}
                >
                  <Tab 
                    // icon={<Analytics className="mr-2" />} 
                    // iconPosition="start"
                    label={
                      <Box className="flex items-center">
                        Portfolio Dashboard
                        <Chip 
                          label="Live" 
                          size="small" 
                          className="ml-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs h-5 border border-green-300 shadow-md"
                        />
                      </Box>
                    } 
                  />
                  <Tab 
                    icon={<Chat className="mr-2" />} 
                    iconPosition="start"
                    label={
                      <Box className="flex items-center">
                        AI Research
                        <Chip 
                          label="AI" 
                          size="small" 
                          className="ml-2 bg-gradient-to-r from-purple-400 to-pink-500 text-white text-xs h-5 border border-purple-300 shadow-md"
                        />
                      </Box>
                    } 
                  />
                </Tabs>
              </Box>

              {/* Right Section - Enhanced Controls */}
              <Box className="flex items-center space-x-4 ml-8">
                
                {/* Enhanced Theme Toggle */}
                <Box className={`flex items-center space-x-2 rounded-2xl px-4 py-2 shadow-lg ${
                  darkMode 
                    ? 'bg-slate-700/50 border border-slate-600' 
                    : 'bg-white/20 border border-white/30'
                } backdrop-blur-sm`}>
                  <LightMode className={`text-sm ${darkMode ? 'text-blue-300' : 'text-yellow-300'}`} />
                  <Switch
                    checked={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                    color="default"
                    size="medium"
                    sx={{
                      '& .MuiSwitch-track': {
                        background: darkMode ? 'linear-gradient(90deg, #475569, #64748b)' : 'linear-gradient(90deg, #93c5fd, #c4b5fd)',
                      },
                      '& .MuiSwitch-thumb': {
                        background: darkMode ? 'linear-gradient(135deg, #38bdf8, #a78bfa)' : 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                        boxShadow: '0 2px 8px rgba(139, 92, 246, 0.3)',
                      }
                    }}
                  />
                  <DarkMode className={`text-sm ${darkMode ? 'text-purple-300' : 'text-blue-400'}`} />
                </Box>

               
                 
              </Box>
            </Toolbar>
          </AppBar>

          {/* Enhanced Main Content Area */}
          <Box className="p-6 max-w-7xl mx-auto">
            <Box className={`rounded-3xl p-8 shadow-2xl border ${
              darkMode 
                ? 'bg-slate-800/50 border-slate-700 backdrop-blur-lg' 
                : 'bg-white/80 border-white/50 backdrop-blur-lg'
            }`}>
              {activeTab === 0 && <Dashboard />}
              {activeTab === 1 && <ChatInterface />}
            </Box>
          </Box>
        </div>
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;