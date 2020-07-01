import React, { useEffect, useRef } from "react";
import {
  withStyles,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { useRouteMatch, useHistory } from "react-router-dom";

import RowContainer from "../../Row/RowContainer";
import Team from "../../../Types/Team";

export interface MatchParams {
  team: string;
}

interface TableViewProps {
  teams: [Team];
  activeTeamName: string;
  activeTeam: any;
  mapTeamsById: any;
  handleClick: () => void;
}

const TableView: React.SFC<TableViewProps> = (props) => {
  const classes = useStyles();
  let match = useRouteMatch<MatchParams>();

  const {
    teams,
    activeTeamName,
    activeTeam,
    mapTeamsById,
    handleClick,
  } = props;

  return (
    <>
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.punchLine}
      >
        <Grid item>
          <Typography variant="h4" align="center">
            Clicking for team <b>{activeTeamName}</b>
          </Typography>
        </Grid>
      </Grid>

      <Grid container className={classes.urlLineContainer}>
        <Grid item xs={8}>
          <Grid container justify="center">
            <Grid item>
              <Typography variant="subtitle1" className={classes.urlLine}>
                Too lazy to click? Let your pals click for you:
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container justify="flex-end">
            <Grid item>
              <OutlinedInput
                placeholder="Your mom"
                value={window.location.href}
                className={classes.wholeUrl}
                classes={{
                  input: classes.inputField,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <div className={classes.listWrap}>
        <Grid container alignItems="stretch">
          <Grid item xs={12} className={classes.btnItem}>
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
        <Grid container className={classes.counterContainer}>
          <Grid item xs={6}>
            <Typography align="center">Your Clicks:</Typography>
            <Typography align="center" className={classes.bigBlueText}>
              {activeTeam.sessionClicks}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography align="center">Team Clicks:</Typography>
            <Typography align="center" className={classes.bigBlueText}>
              {activeTeam.totalClicks}
            </Typography>
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
    punchLine: {
      minHeight: "6rem",
    },
    urlLineContainer: {
      marginBottom: 15,
    },
    urlLine: {
      width: "100%",
    },
    listWrap: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
      border: "3px solid #5194DF",
      borderRadius: 5,
    },
    counterContainer: {
      marginTop: 20,
      marginBottom: 20,
    },
    bigBlueText: {
      fontSize: 30,
      fontWeight: 700,
      color: "#5194DF",
    },
    table: {
      width: "100%",
    },
    wholeUrl: {
      marginLeft: 5,
    },
    inputField: {
      padding: 6,
      fontSize: 14,
      backgroundColor: "white",
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
