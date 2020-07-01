import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { useHistory } from "react-router-dom";

import {
  fetchAllData,
  fetchCreateTeam,
} from "../../../ReduxModules/appReducer";
import * as server from "../../../lib/serverData";

import MainPageView from "./MainPageView";
import Team from "../../../Types/Team";

const ListContainer: React.SFC<IAppProps> = (props) => {
  let history = useHistory();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const inputName = useRef<HTMLInputElement>(null);

  const {
    teams,
    activeTeam,
    mapTeamsById,
    getAllData,
    createNewTeamDisp,
  } = props;

  useEffect(() => {
    console.log("UseEff appState: ", teams);
    getAllData();
  }, []);

  useEffect(() => {
    console.log("UseEff appState: ", teams);
    if (activeTeam && activeTeam.urlName) {
      history.push(`/${activeTeam.urlName}`);
    }
  }, [activeTeam]);

  const handleClick = () => {
    if (null != inputName.current && inputName.current.value != "") {
      setShowAlert(false);
      console.log("inputName: ", inputName.current.value);
      createNewTeamDisp(inputName.current.value);
    } else {
      setShowAlert(true);
    }
  };

  return (
    <MainPageView
      teams={teams}
      mapTeamsById={mapTeamsById}
      handleClick={handleClick}
      inputName={inputName}
      showAlert={showAlert}
    />
  );
};

const StateToProps = () => {
  return (state: any, ownProps: any) => {
    console.log("State to propsss: ", state);
    return {
      teams: state.rootReducer.app_reducer.teams,
      activeTeam: state.rootReducer.app_reducer.activeTeam,
      mapTeamsById: state.rootReducer.app_reducer.mapTeamsById,
    };
  };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
  return {
    dispatch: (action: any) => dispatch(action),
    getAllData: () => dispatch(fetchAllData()),
    createNewTeamDisp: (name: string) => dispatch(fetchCreateTeam(name)),
  };
};

export default connect(StateToProps, mapDispatchToProps)(ListContainer);

interface IAppProps {
  teams: any;
  activeTeam: Team;
  mapTeamsById: any;
  getAllData: () => void;
  createNewTeamDisp: (name: string) => void;
}
