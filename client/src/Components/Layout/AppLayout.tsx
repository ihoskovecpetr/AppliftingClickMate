import * as React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import {
  updateTeamById,
  // updateActiveTeamTotalClicks,
} from "../../ReduxModules/appReducer";
import Team from "../../Types/Team";

let url = "http://localhost:4005";

if (process.env.NODE_ENV === "development") {
  url = "http://localhost:4005";
}

if (process.env.NODE_ENV === "production") {
  url = "https://degrassi-mountie-58419.herokuapp.com/";
  console.log("Production link: ", window.location);
}

const socket = io(url);

interface ILayoutProps {
  activeTeam: any;
  updateTeamByIdDisp: (teamObj: any) => void;
  // updateActiveTeamTotDisp: (totalClicks: number) => void;
}

const AppLayout: React.SFC<ILayoutProps> = (props) => {
  const classes = useStyles();

  const { activeTeam, updateTeamByIdDisp } = props;

  useEffect(() => {
    socket.on("clicked", (body: any) => {
      console.log("Something SOCKET CLICKED", body);
      updateTeamByIdDisp(body);
    });
  }, []);

  return (
    <div className={classes.appWrap}>
      <Typography component="h1" className={classes.topLine}>
        STFUANDCLICK.COM
      </Typography>
      <Container maxWidth="sm" className="mainContainer">
        <>{props.children}</>
      </Container>
    </div>
  );
};

const StateToProps = () => {
  return (state: any, ownProps: any) => {
    return {
      activeTeam: state.rootReducer.app_reducer.activeTeam,
    };
  };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
  return {
    updateTeamByIdDisp: (teamObj: any) => dispatch(updateTeamById(teamObj)),
  };
};

export default connect(StateToProps, mapDispatchToProps)(AppLayout);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appWrap: {
      width: "100%",
      minHeight: "100vh",
      backgroundColor: "#F1F2F3",
    },
    topLine: {
      backgroundColor: "#5194DF",
      width: "100%",
      color: "white",
      fontWeight: 700,
      textAlign: "center",
    },
    mainContainer: {
      backgroundColor: "white",
    },
  })
);
