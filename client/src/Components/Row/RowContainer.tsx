import * as React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useRouteMatch, useHistory } from "react-router-dom";
import { Selector, createSelector } from "reselect";

import RowView from "./RowView";
import { setActiveRow, getTeamByUrlName } from "../../ReduxModules/appReducer";
import { AppState } from "../../store";
import Team from "../../Types/Team";
import { MatchParams } from "../Pages/TeamPage/TeamPageView";

interface rowProps {
  position: number;
  groupName: string;
  groupUrlName: string;
  groupClicks: number;
  groupId: string;

  activeTeam: any;
  sessionString: string;

  setActiveRowDisp: (id: string, teamObj: Team) => void;
  getTeamByUrlDisp: (urlName: string, sessionStr: string) => void;
}

const RowContainer: React.FC<rowProps> = (props) => {
  const [active, setActive] = useState<boolean>(false);

  const {
    position,
    groupName,
    groupUrlName,
    groupId,
    groupClicks,
    sessionString,
    activeTeam,

    setActiveRowDisp,
    getTeamByUrlDisp,
  } = props;

  useEffect(() => {
    if (activeTeam._id == groupId) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [activeTeam]);

  const handleClickActivate = () => {
    // setActive(!active);
    setActiveRowDisp(groupId, {
      name: groupName,
      urlName: groupUrlName,
      totalClicks: groupClicks,
      sessionClicks: 0,
      _id: groupId,
    });
    getTeamByUrlDisp(groupUrlName, sessionString);
    // history.push("/" + groupUrlName);
  };

  return (
    <RowView
      position={position}
      groupName={groupName}
      groupClicks={groupClicks}
      groupId={groupId}
      active={active}
      handleClickActivate={handleClickActivate}
    />
  );
};

interface LinkStateToProps {
  activeTeam: any;
  sessionString: string;
}

const StateToProps = () => {
  return (state: any, ownProps: any): LinkStateToProps => {
    return {
      activeTeam: state.rootReducer.app_reducer.activeTeam,
      sessionString: state.rootReducer.app_reducer.sessionString,
    };
  };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
  return {
    dispatch: (action: any) => dispatch(action),
    setActiveRowDisp: (id: string, teamObj: Team) =>
      dispatch(setActiveRow(id, teamObj)),
    getTeamByUrlDisp: (urlName: string, sessionStr: string) =>
      dispatch(getTeamByUrlName(urlName, sessionStr)),
  };
};

export default connect(StateToProps, mapDispatchToProps)(RowContainer);
