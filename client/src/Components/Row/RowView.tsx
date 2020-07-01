import React from "react";
import {
  withStyles,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const TableRowView: React.SFC<TableItemProps> = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const {
    position,
    groupName,
    groupClicks,
    groupId,
    active,
    handleClickActivate,
  } = props;

  return (
    <StyledTableRow
      key={groupName}
      onClick={handleClickActivate}
      style={{ backgroundColor: active ? "red" : "rgba(81,148,223,0.23)" }}
    >
      <StyledTableCell align="center" style={{ width: "10%" }}>
        {position}.
      </StyledTableCell>
      <StyledTableCell align="left">{groupName}</StyledTableCell>
      <StyledTableCell align="right">{groupClicks}</StyledTableCell>
    </StyledTableRow>
  );
};

export default TableRowView;

interface TableItemProps {
  position: number;
  groupName: string;
  groupClicks: number;
  groupId: string;
  active: boolean;
  handleClickActivate: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: "rgba(81,148,223,0.23)",
      },
    },
  })
)(TableRow);

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "transparent",
      color: theme.palette.common.white,
      paddingLeft: "0 !important",
      padding: 5,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);
