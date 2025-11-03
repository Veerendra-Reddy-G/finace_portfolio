// src/utils/mockData.js
export const portfolioData = {
    comparison_summary: {
      comparison: {
        "Commodities": {
          "live_market_value": 0.0,
          "live_allocation_percentage": 0.0,
          "target_market_value": 10676702.487015877,
          "target_allocation_percentage": 5.0,
          "difference_value": -10676702.487015877,
          "difference_percentage": -5.0,
          "action": "BUY",
          "sub_asset_classes": {
            "Gold": {
              "live_market_value": 0.0,
              "live_allocation_percentage": 0.0,
              "target_market_value": 10676702.487015877,
              "target_allocation_percentage": 5.0,
              "difference_value": -10676702.487015877,
              "difference_percentage": -5.0,
              "action": "BUY"
            }
          }
        },
        "Debt": {
          "live_market_value": 0.0,
          "live_allocation_percentage": 0.0,
          "target_market_value": 21353404.974031754,
          "target_allocation_percentage": 10.0,
          "difference_value": -21353404.974031754,
          "difference_percentage": -10.0,
          "action": "BUY",
          "sub_asset_classes": {
            "Short-Duration-Funds": {
              "live_market_value": 0.0,
              "live_allocation_percentage": 0.0,
              "target_market_value": 18164186.392199717,
              "target_allocation_percentage": 8.506459,
              "difference_value": -18164186.392199717,
              "difference_percentage": -8.506459,
              "action": "BUY"
            },
            "Medium-Duration-Funds": {
              "live_market_value": 0.0,
              "live_allocation_percentage": 0.0,
              "target_market_value": 3189218.581832036,
              "target_allocation_percentage": 1.493541,
              "difference_value": -3189218.581832036,
              "difference_percentage": -1.493541,
              "action": "BUY"
            }
          }
        },
        "Alternatives": {
          "live_market_value": 0.0,
          "live_allocation_percentage": 0.0,
          "target_market_value": 17082723.979225405,
          "target_allocation_percentage": 8.0,
          "difference_value": -17082723.979225405,
          "difference_percentage": -8.0,
          "action": "BUY",
          "sub_asset_classes": {
            "Managed Investments": {
              "live_market_value": 0.0,
              "live_allocation_percentage": 0.0,
              "target_market_value": 17082723.979225405,
              "target_allocation_percentage": 8.0,
              "difference_value": -17082723.979225405,
              "difference_percentage": -8.0,
              "action": "BUY"
            }
          }
        },
        "Equity": {
          "live_market_value": 213534049.74031755,
          "live_allocation_percentage": 100.0,
          "target_market_value": 164014880.08611265,
          "target_allocation_percentage": 76.809708,
          "difference_value": 49519169.65420488,
          "difference_percentage": 23.190292,
          "action": "SELL",
          "sub_asset_classes": {
            "Large-Cap": {
              "live_market_value": 78487785.77392,
              "live_allocation_percentage": 36.75656686573891,
              "target_market_value": 160519246.54892477,
              "target_allocation_percentage": 75.17267,
              "difference_value": -82031460.77500476,
              "difference_percentage": -38.41610313426109,
              "action": "BUY"
            },
            "Mid-Cap": {
              "live_market_value": 72289803.05214263,
              "live_allocation_percentage": 33.85399337485311,
              "target_market_value": 2834446.70557198,
              "target_allocation_percentage": 1.327398,
              "difference_value": 69455356.34657066,
              "difference_percentage": 32.52659537485311,
              "action": "SELL"
            },
            "Small-Cap": {
              "live_market_value": 62756460.9142549,
              "live_allocation_percentage": 29.38943975940798,
              "target_market_value": 661186.8316159192,
              "target_allocation_percentage": 0.30964,
              "difference_value": 62095274.08263898,
              "difference_percentage": 29.079799759407983,
              "action": "SELL"
            }
          }
        }
      }
    },
    live_portfolio_info: {
      uuid: "09a0f369-94a4-47df-9e57-57103bdbbd60",
      name: "abbas.h-portfolio",
      portfolio_type: "LIVE",
      status: "ACTIVE",
      base_currency: "INR",
      created: "2025-10-15T14:29:56.632160+00:00",
      modified: "2025-10-15T14:29:56.632185+00:00",
      total_market_value: 213534049.74031755,
      allocations: {
        Equity: {
          market_value: 213534049.74031755,
          percentage: 100.0,
          sub_asset_classes: {
            "Large-Cap": {
              market_value: 78487785.77392,
              percentage: 36.75656686573891,
              instruments: [
                {
                  name: "BHARAT PETROLEUM",
                  market_value: 3088743.8442399,
                  percentage: 3.9353178507760003
                },
                {
                  name: "BOSCH",
                  market_value: 3299166.265625,
                  percentage: 4.203413605179381
                }
              ]
            }
          }
        }
      }
    }
  };
  
  export const performanceData = {
    equity: {
      cost: 218504637.64,
      portfolio_cost_pct: 100.0,
      market_value: 213534049.74031755,
      portfolio_allocation: 100.0,
      xirr: 0.05716433,
      constituents: [
        {
          name: "Large-Cap",
          cost: 82614583.81,
          cost_pct: 37.81,
          market_value: 78487785.77392,
          allocation: 36.76,
          xirr: -0.03536872,
          returns_contribution: -0.013372913032,
          instruments: [
            {
              name: "BHARAT PETROLEUM",
              cost: 5385834.07,
              cost_pct: 6.52,
              market_value: 3088743.8442399,
              allocation: 3.94,
              xirr: -0.3243997,
              returns_contribution: -0.02115086044
            }
          ]
        }
      ]
    }
  };
  
  export const holdingsData = {
    equity: {
      total_cost: 218504637.64,
      income: 0,
      market_value: 213534049.74031755,
      unrealized_pnl: -4970587.89968246,
      roi: -0.02274820321146599,
      xirr: 0.05716433,
      holding_percentage: 100.0,
      constituents: [
        {
          name: "Large-Cap",
          total_cost: 82614583.81,
          income: 0.0,
          market_value: 78487785.77392,
          unrealized_pnl: -4126798.03608,
          roi: -0.04995241573292869,
          xirr: -0.03536872,
          holding_percentage: 36.75656686573891,
          instruments: [
            {
              name: "BHARAT PETROLEUM",
              total_cost: 5385834.07,
              income: 0.0,
              market_value: 3088743.8442399,
              unrealized_pnl: -2297090.2257601,
              roi: -0.42650594056643487,
              xirr: -0.3243997,
              holding_percentage: 3.9353178507760003
            }
          ]
        }
      ]
    }
  };
  
  export const mockTransactions = [
    {
      id: 1,
      date: "2024-01-15",
      type: "BUY",
      security: "ICICI BANK",
      quantity: 100,
      price: 950.50,
      amount: 95050.00,
      status: "Completed"
    },
    {
      id: 2,
      date: "2024-01-10",
      type: "SELL",
      security: "RELIANCE INDUSTRIES",
      quantity: 50,
      price: 2450.75,
      amount: 122537.50,
      status: "Completed"
    }
  ];
  
  export const mockChatHistory = [
    {
      id: 1,
      role: 'user',
      content: 'Analyze Infosys financial health',
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: 2,
      role: 'assistant',
      content: 'I\'ll analyze Infosys financial health by examining their latest financial statements, key ratios, sector comparison, recent news, and risk assessment.',
      timestamp: new Date(Date.now() - 240000),
      researchPlan: {
        steps: [
          { id: 1, name: 'Fetch latest financial statements', status: 'completed', duration: '2s' },
          { id: 2, name: 'Calculate key ratios', status: 'completed', duration: '1s' },
          { id: 3, name: 'Compare with sector peers', status: 'in-progress', duration: '3s' },
          { id: 4, name: 'Analyze recent news', status: 'pending', duration: null },
          { id: 5, name: 'Generate risk assessment', status: 'pending', duration: null }
        ]
      }
    }
  ];