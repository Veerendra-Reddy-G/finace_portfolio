// src/components/Dashboard/TransactionHistory.jsx
import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Box,
  Typography,
  Chip,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import { Search, CalendarToday, FilterList } from '@mui/icons-material';
import { useApp } from '../../contexts/AppContext';
import { formatCurrency } from '../../utils/formatters';

const TransactionHistory = () => {
  const { state } = useApp();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const transactions = state.transactions;

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.security.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter.toUpperCase();
    const matchesDate = dateFilter === 'all' || true; // Simplified date filter
    
    return matchesSearch && matchesType && matchesDate;
  });

  const paginatedTransactions = filteredTransactions.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getTypeColor = (type) => {
    return type === 'BUY' ? 'success' : 'error';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'Pending': return 'warning';
      case 'Failed': return 'error';
      default: return 'default';
    }
  };

  return (
    <Paper className="rounded-xl shadow-lg">
      <Box className="p-4 border-b">
        <Typography variant="h6" className="font-bold mb-4">
          Transaction History
        </Typography>
        
        <Box className="flex flex-col md:flex-row gap-4 mb-4">
          <TextField
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            className="flex-1"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search className="text-gray-400" />
                </InputAdornment>
              ),
            }}
          />
          
          <FormControl size="small" className="w-full md:w-40">
            <InputLabel>Type</InputLabel>
            <Select
              value={typeFilter}
              label="Type"
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <MenuItem value="all">All Types</MenuItem>
              <MenuItem value="buy">Buy</MenuItem>
              <MenuItem value="sell">Sell</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" className="w-full md:w-40">
            <InputLabel>Date</InputLabel>
            <Select
              value={dateFilter}
              label="Date"
              onChange={(e) => setDateFilter(e.target.value)}
              startAdornment={<FilterList className="text-gray-400 mr-2" />}
            >
              <MenuItem value="all">All Time</MenuItem>
              <MenuItem value="week">Last Week</MenuItem>
              <MenuItem value="month">Last Month</MenuItem>
              <MenuItem value="quarter">Last Quarter</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow className="bg-gray-50">
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Security</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTransactions.map((transaction) => (
              <TableRow 
                key={transaction.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell>
                  <Box className="flex items-center">
                    <CalendarToday className="text-gray-400 mr-2 text-sm" />
                    <Typography variant="body2">
                      {new Date(transaction.date).toLocaleDateString()}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={transaction.type}
                    color={getTypeColor(transaction.type)}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" className="font-medium">
                    {transaction.security}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2">
                    {transaction.quantity.toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2">
                    {formatCurrency(transaction.price)}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" className="font-medium">
                    {formatCurrency(transaction.amount)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={transaction.status}
                    color={getStatusColor(transaction.status)}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredTransactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TransactionHistory;