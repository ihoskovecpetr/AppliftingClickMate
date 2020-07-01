import * as React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { useRouteMatch, useHistory } from "react-router-dom";

import {
  fetchAllData,
  getTeamByUrlName,
  createSessionString,
  // actualClicksOnActiveTeam,
} from "../../../ReduxModules/appReducer";

import { sendClick } from "../../../lib/serverData";

import TeamPageView, { MatchParams } from "./TeamPageView";
import Team from "../../../Types/Team";

const ListContainer: React.SFC<IAppProps> = (props) => {
  let match = useRouteMatch<MatchParams>();
  let history = useHistory();
  const {
    teams,
    activeTeam,
    sessionString,
    mapTeamsById,
    getAllData,
    getTeamByUrlDisp,
    createSessionDisp,
    // actualClicksDisp,
    // sendClickDisp,
  } = props;

  useEffect(() => {
    getAllData();
    createSessionDisp();
  }, []);

  useEffect(() => {
    if (match.params.team && activeTeam.urlName != match.params.team) {
      getTeamByUrlDisp(match.params.team);
    }
  }, [match]);

  useEffect(() => {
    console.log("activeTeam:  : ", activeTeam, activeTeam.name);
    if (activeTeam.urlName && match.params.team != activeTeam.urlName) {
      history.push(`/${activeTeam.urlName}`);
    }
  }, [activeTeam]);

  const handleClick = async () => {
    const newData = await sendClick(activeTeam._id, sessionString);
    const jsonData = await newData.json();
    // actualClicksDisp(jsonData.totalClicks, jsonData.clicks);
  };

  return (
    <TeamPageView
      teams={teams}
      activeTeamName={activeTeam.name}
      activeTeam={activeTeam}
      mapTeamsById={mapTeamsById}
      handleClick={handleClick}
    />
  );
};

// const makeGetConfADMemb = () => createSelector(
//   (state, props) => state.group_state.confirmedGroupMembers[props.group_name],
//   (confADMemb) => {
//     return confADMemb
//   }
// )

const StateToProps = () => {
  // const getADMmbs = makeGetConfADMemb()
  return (state: any, ownProps: any) => {
    console.log("State to propsss: ", state);
    return {
      // confirmedADMemb: getADMmbs(state, ownProps),
      teams: state.rootReducer.app_reducer.teams,
      activeTeam: state.rootReducer.app_reducer.activeTeam,
      sessionString: state.rootReducer.app_reducer.sessionString,
      mapTeamsById: state.rootReducer.app_reducer.mapTeamsById,
    };
  };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
  console.log("Team Dis to Props ownProps: ", ownProps);

  return {
    dispatch: (action: any) => dispatch(action),
    getAllData: () => dispatch(fetchAllData()),
    getTeamByUrlDisp: (urlName: string) => dispatch(getTeamByUrlName(urlName)),
    createSessionDisp: () => dispatch(createSessionString()),
  };
};

export default connect(StateToProps, mapDispatchToProps)(ListContainer);

interface IAppProps {
  teams: any;
  activeTeam: Team;
  sessionString: string;
  mapTeamsById: any;
  getAllData: () => void;
  getTeamByUrlDisp: (urlName: string) => void;
  createSessionDisp: () => void;
}
