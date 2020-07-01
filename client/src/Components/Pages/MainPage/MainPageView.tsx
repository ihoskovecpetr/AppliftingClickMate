import React, { useEffect } from "react";
import {
  withStyles,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
// import ListSubheader from "@material-ui/core/ListSubheader";
// import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import OutlinedInput from "@material-ui/core/OutlinedInput";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import RowContainer from "../../Row/RowContainer";
import Team from "../../../Types/Team";

interface TableViewProps {
  teams: [Team];
  mapTeamsById: any;
  handleClick: () => void;
  inputName: any;
  showAlert: boolean;
}

const TableView: React.SFC<TableViewProps> = (props) => {
  const classes = useStyles();
  const { teams, mapTeamsById, handleClick, inputName, showAlert } = props;

  return (
    <>
      <Grid
        container
        className={classes.quoteGrid}
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <Typography component="p" className={classes.quotedText}>
            'Its really simple, you just need to click as fast as you can'
          </Typography>
          <Typography component="p" className={classes.signatureText}>
            - anonymous
          </Typography>
        </Grid>
      </Grid>
      <div className={classes.listWrap}>
        <Grid container alignItems="stretch">
          <Grid item xs={6} className={classes.btnItem}>
            <Typography variant="subtitle1" component="p">
              Enter your team name:
            </Typography>
            <OutlinedInput
              // className={classes.input}
              placeholder="Your mom"
              inputRef={inputName}
              classes={{
                input: classes.inputField,
              }}
              // inputProps={{ 'aria-label': 'id no.', className: classes.inputField }}
              // disabled={disabled}
              // onChange={onChange}
            />
          </Grid>
          <Grid item xs={6} className={classes.btnItem}>
            <Button
              variant="contained"
              fullWidth
              color="primary"
              classes={{
                root: classes.btnRoot,
                containedPrimary: classes.btnPrimary,
                label: classes.btnLabel,
              }}
              onClick={handleClick}
            >
              Click
            </Button>
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Grid item>
            {!showAlert ? null : (
              <Alert severity="error">You must fill up name first!</Alert>
            )}
          </Grid>
        </Grid>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell
                align="right"
                style={{ width: "10%" }}
              ></StyledTableCell>
              <StyledTableCell align="left">TEAM</StyledTableCell>
              <StyledTableCell align="right">CLICKS</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mapTeamsById &&
              Object.keys(mapTeamsById).length != 0 &&
              Object.keys(mapTeamsById).map((teamId, index) => {
                let group = mapTeamsById[teamId];

                return (
                  <RowContainer
                    key={teamId}
                    position={index}
                    groupName={group.name}
                    groupUrlName={group.urlName}
                    groupClicks={group.totalClicks}
                    groupId={group._id}
                  />
                );
              })}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default TableView;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    quoteGrid: {
      minHeight: "6rem",
    },
    quotedText: {
      textAlign: "center",
    },
    signatureText: {
      textAlign: "right",
      paddingRight: 60,
    },
    listWrap: {
      width: "100%",
      // maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      border: "3px solid #5194DF",
      borderRadius: 5,
    },

    table: {
      width: "100%",
    },
    inputField: {
      padding: 6,
      fontSize: 14,
    },
    btnRoot: {
      height: "100%",
    },
    btnPrimary: {
      backgroundColor: "#5194DF",
    },
    btnLabel: {
      fontWeight: 800,
      fontSize: "1.5rem",
    },
    btnItem: {
      padding: 10,
      paddingBottom: 0,
    },
  })
);

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "transparent",
      color: "grey",
      fontWeight: 700,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
