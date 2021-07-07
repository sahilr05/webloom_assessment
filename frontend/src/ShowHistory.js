import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function HistoryList({ rows }) {
    console.log(rows)
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell component="th">Domain Name</TableCell>
                        <TableCell component="th" align="right">Org</TableCell>
                        <TableCell component="th" align="right">Country</TableCell>
                        <TableCell component="th" align="right">Status</TableCell>
                        {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.domain_name}>
                            <TableCell component="th" scope="row">
                                {row.domain_name}
                            </TableCell>
                            <TableCell align="right">{row.org}</TableCell>
                            <TableCell align="right">{row.country}</TableCell>
                            <TableCell align="right">{row.status}</TableCell>
                            {/* <TableCell align="right">{row.protein}</TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
