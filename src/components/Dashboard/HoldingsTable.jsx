// src/components/Dashboard/HoldingsTable.jsx
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
  TableSortLabel,
  Chip,
  Typography,
  TextField,
  Box,
  InputAdornment
} from '@mui/material';
import { Search, TrendingUp, TrendingDown } from '@mui/icons-material';
import { formatCurrency, formatPercentage, getColorForValue } from '../../utils/formatters';

const HoldingsTable = ({ data }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('market_value');
  const [searchTerm, setSearchTerm] = useState('');

  // Flatten all instruments for the table
  const allInstruments = data.equity.constituents.flatMap(category => 
    category.instruments.map(instrument => ({
      ...instrument,
      category: category.name,
      sector: 'Equity' // This would come from actual data
    }))
  );

  const filteredInstruments = allInstruments.filter(instrument =>
    instrument.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    instrument.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedInstruments = filteredInstruments.sort((a, b) => {
    if (order === 'asc') {
      return a[orderBy] < b[orderBy] ? -1 : 1;
    }
    return a[orderBy] > b[orderBy] ? -1 : 1;
  });

  const paginatedInstruments = sortedInstruments.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const columns = [
    { id: 'name', label: 'Instrument', sortable: true },
    { id: 'category', label: 'Category', sortable: true },
    { id: 'market_value', label: 'Market Value', sortable: true },
    { id: 'holding_percentage', label: 'Allocation', sortable: true },
    { id: 'roi', label: 'ROI', sortable: true },
    { id: 'unrealized_pnl', label: 'P&L', sortable: true },
    { id: 'xirr', label: 'XIRR', sortable: true },
  ];

  return (
    <Paper className="rounded-xl shadow-lg">
      <Box className="p-4 border-b" 
style={{marginLeft:"10px", marginTop:"10px"}}
>
        <Typography variant="h6" className="font-bold mb-4">
          Portfolio Holdings
        </Typography>
        <TextField
          placeholder="Search holdings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          className="w-full md:w-96"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search className="text-gray-400" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow className="bg-gray-50">
              {columns.map((column) => (
                <TableCell key={column.id}>
                  {column.sortable ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={() => handleSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedInstruments.map((instrument, index) => (
              <TableRow 
                key={index}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <TableCell>
                  <Typography variant="body2" className="font-medium">
                    {instrument.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={instrument.category} 
                    size="small"
                    color={instrument.category.includes('Large') ? 'primary' : 
                           instrument.category.includes('Mid') ? 'secondary' : 'default'}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" className="font-medium">
                    {formatCurrency(instrument.market_value)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {formatPercentage(instrument.holding_percentage / 100)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    icon={instrument.roi >= 0 ? <TrendingUp /> : <TrendingDown />}
                    label={formatPercentage(instrument.roi)}
                    color={instrument.roi >= 0 ? 'success' : 'error'}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Typography 
                    variant="body2" 
                    className={`font-medium ${getColorForValue(instrument.unrealized_pnl)}`}
                  >
                    {formatCurrency(instrument.unrealized_pnl)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography 
                    variant="body2" 
                    className={getColorForValue(instrument.xirr)}
                  >
                    {formatPercentage(instrument.xirr)}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={filteredInstruments.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default HoldingsTable;