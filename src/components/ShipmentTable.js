import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, TextField } from '@material-ui/core';
import './ShipmentTable.css';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useHistory } from 'react-router-dom';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        textAlign: 'center'
    },
    body: {
        fontSize: 14,
        textAlign: 'center'
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    tableDiv: {
        display: 'flex',
        flexDirection: 'column'
    },
    table: {
        minWidth: 700,
    },
    tableHeaderCells: {
        display: 'flex',
        cursor: 'pointer',
        justifyContent: 'center'

    },
    searchDiv: {
        paddingBottom: '20px',
        alignSelf: 'flex-start',
        width: '70%'
    },
    searchInput: {
        width: '100%'
    },
    pageHeader: {
        alignSelf: 'flex-start',
        fontWeight: 1000,
    },
    pagination: {
        paddingTop: '10px',
        justifySelf: 'start',
        display: 'flex',
    },
    paginationButton: {
        marginRight: '5px',
        justifySelf: 'start'
    }
});

export default function ShipmentTable({
    shipments,
    setCurrentPage,
    nextDisabled,
    prevDisabled,
    handleSort,
    sortConfig,
}) {
    const classes = useStyles();
    const [keyword, setKeyword] = useState('');
    let history = useHistory();

    function setSortIcon(column) {
        if (sortConfig !== null &&
            sortConfig.direction === 'ascending' &&
            sortConfig.key === column) {
            return (<ArrowDropUpIcon />)
        } else if (sortConfig !== null &&
            sortConfig.direction === 'descending' &&
            sortConfig.key === column) {
            return (<ArrowDropDownIcon />)
        }
    }
    const filteredShipments = shipments.filter(shipment =>
        shipment.id.toLowerCase().includes(keyword.toLowerCase()))
    return (
        <div className={classes.tableDiv}>
            <h2 className={classes.pageHeader}>Shipments Data</h2>
            <div className={classes.searchDiv}>
                <TextField
                    className={classes.searchInput}
                    id="filled-basic"
                    label="Search by id..."
                    variant="filled"
                    value={keyword}
                    onChange={e => setKeyword(e.target.value)}
                />
            </div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Index</StyledTableCell>
                            <StyledTableCell align="right"
                                onClick={() => handleSort('id')}
                            >
                                <div className={classes.tableHeaderCells}>
                                    {setSortIcon('id')}
                                    <span>ID</span>
                                </div>
                            </StyledTableCell>
                            <StyledTableCell
                                align="right"
                                onClick={() => handleSort('name')}
                            >
                                <div className={classes.tableHeaderCells}>
                                    {setSortIcon('name')}
                                    <span>Name</span>
                                </div>
                            </StyledTableCell>
                            <StyledTableCell
                                align="right"
                                onClick={() => handleSort('origin')}
                            >
                                <div className={classes.tableHeaderCells}>
                                    {setSortIcon('origin')}
                                    <span>Origin</span>
                                </div>
                            </StyledTableCell>
                            <StyledTableCell
                                align="right"
                                onClick={() => handleSort('status')}
                            >
                                <div className={classes.tableHeaderCells}>
                                    {setSortIcon('status')}
                                    <span>Status</span>
                                </div>

                            </StyledTableCell>
                            <StyledTableCell align="right">Detail</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredShipments.map((shipment, index) => (
                            <StyledTableRow key={shipment.id}>
                                <StyledTableCell component="th" scope="row">{index + 1}</StyledTableCell>
                                <StyledTableCell
                                    component="th"
                                    scope="row"
                                >{shipment.id}</StyledTableCell>
                                <StyledTableCell component="th" scope="row">{shipment.name}</StyledTableCell>
                                <StyledTableCell align="right">{shipment.origin}</StyledTableCell>
                                <StyledTableCell align="right">{shipment.status}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <Button variant="contained"
                                        color="primary"
                                        onClick={() => history.push({
                                            pathname: '/details',
                                            state: {
                                                id: shipment.id,
                                            }
                                        })
                                        }
                                    >
                                        Details
                                    </Button>
                                </StyledTableCell>

                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className={classes.pagination}>
                <Button
                    className={classes.paginationButton}
                    variant='contained'
                    onClick={() => setCurrentPage(-1)}
                    disabled={prevDisabled}
                >
                    Previous
                </Button>
                <Button
                    className={classes.paginationButton}
                    variant='contained'
                    onClick={() => setCurrentPage(1)}
                    disabled={nextDisabled}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}
