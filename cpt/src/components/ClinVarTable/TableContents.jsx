import React, {useState, useEffect, useMemo} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { visuallyHidden } from '@mui/utils';


function descendingComparator(a, b, orderBy, order) {
  if (b[orderBy] < a[orderBy]) {
    if (b[orderBy] === "" && order === 'asc') {
      return 1;
    }
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    if (a[orderBy] === "" && order === 'asc') {
      return -1;
    }
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy, order)
    : (a, b) => -descendingComparator(a, b, orderBy, order);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells_cpt = [
  {
    id: 'mutant',
    sort_id: 'mutant_sort',
    numeric: false,
    minWidth: 90,
    label: 'Mutant',
  },
  {
    id: 'label',
    sort_id: 'label_sort',
    numeric: true,
    minWidth: 90,
    label: 'Label',
  },
  {
    id: 'score',
    sort_id: 'score',
    numeric: true,
    minWidth: 100,
    label: 'CPT Scores',
  }
];

const headCells_user = [
  {
    id: 'mutant',
    sort_id: 'mutant_sort',
    numeric: false,
    minWidth: 90,
    label: 'Mutant',
  },
  {
    id: 'label',
    sort_id: 'label_sort',
    numeric: true,
    minWidth: 90,
    label: 'Label',
  },
  {
    id: 'score',
    sort_id: 'score',
    numeric: true,
    minWidth: 100,
    label: 'Uploaded Scores',
  }
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const [headCells, setHeadCells] = useState(headCells_cpt);

  // var headCells = props.dataSource === 'cpt' ? headCells_cpt : headCells_user
  const getHeadCells = () => {
    var hC = props.dataSource === 'cpt' ? headCells_cpt : headCells_user
    setHeadCells(hC);
  }

  return (
    <TableHead>
      <TableRow>
        {getHeadCells}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align= 'center'
            style={{ minWidth: headCell.minWidth }}
            sortDirection={orderBy === headCell.sort_id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.sort_id}
              direction={orderBy === headCell.sort_id ? order : 'asc'}
              onClick={createSortHandler(headCell.sort_id)}
            >
              {headCell.label}
              {orderBy === headCell.sort_id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function TableContents(props) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('mutant_sort');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
     
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = props.rows.map((n) => n.mutant);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.rows.length) : 0;

  const visibleRows = useMemo(
    () => stableSort(props.rows, getComparator(order, orderBy)).slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage,
        ),
    [props.rows, order, orderBy, page, rowsPerPage],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'small'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={props.rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.mutant);

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.mutant)}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.mutant}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell align="center">{row.mutant}</TableCell>
                    <TableCell align="center">{row.label}</TableCell>
                    <TableCell align="center">{row.score}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (33) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, props.rows.length]}
          component="div"
          count={props.rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}