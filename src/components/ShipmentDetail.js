
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useLocation, useHistory } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import { editeData } from '../actions/actions';
import { connect } from 'react-redux';
const useStyles = makeStyles({
    container: {
        paddingTop: '20px',
    },
    table: {
        minWidth: 650,
    },

});

function ShipmentDetail({ shipments, editeData }) {
    const classes = useStyles();
    let location = useLocation();
    const [editMode, setEditMode] = useState(false);
    const [newName, setNewName] = useState('');

    const history = useHistory();

    const selectedShipment = shipments.find(shipment => shipment.id === location.state.id);
    useEffect(() => {
        setNewName(selectedShipment.name)
    }, [selectedShipment])
    const handleEditName = () => {
        setEditMode(true);
    }
    const handleNewName = (value) => {
        setNewName(value);
    }
    const handleSave = (id) => {
        editeData(id, newName)
        setEditMode(false);
    }
    return (
        <div className={classes.container}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell component="th" scope="row" colSpan={2}>
                                <span>Details of </span> {selectedShipment.id}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                ID
                                    </TableCell>
                            <TableCell component="th" scope="row" colSpan={2}>
                                {selectedShipment.id}
                            </TableCell>
                        </TableRow>
                        {!editMode ?
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Name
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {newName}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <Button
                                        variant='contained'
                                        color='secondary'
                                        onClick={handleEditName}
                                    >
                                        Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                            :
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Name
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <TextField
                                        type='text'
                                        value={newName}
                                        onChange={e => handleNewName(e.target.value)}
                                    />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        onClick={() => handleSave(selectedShipment.id)}
                                    >
                                        Save
                                    </Button>
                                </TableCell>
                            </TableRow>
                        }
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Origin
                                    </TableCell>
                            <TableCell component="th" scope="row" colSpan={2}>
                                {selectedShipment.origin}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row" >
                                Destination
                                    </TableCell>
                            <TableCell component="th" scope="row" colSpan={2}>
                                {selectedShipment.destination}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Mode
                                    </TableCell>
                            <TableCell component="th" scope="row" colSpan={2}>
                                {selectedShipment.mode}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Type
                                    </TableCell>
                            <TableCell component="th" scope="row" colSpan={2}>
                                {selectedShipment.type}
                            </TableCell>
                        </TableRow>
                        <TableRow colSpan={3}>
                            <TableCell component="th" scope="row">
                                <Button
                                    variant='contained'
                                    color='primary'
                                    onClick={() => history.goBack()}>
                                    Back
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        shipments: state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editeData: (id, newName) => dispatch(editeData(id, newName)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShipmentDetail);
