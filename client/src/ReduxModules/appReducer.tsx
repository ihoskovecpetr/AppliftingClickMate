import * as server from "../lib/serverData";
import * as reduceHelpers from "../lib/reduceHelpers";
import Team from "../Types/Team";

// Action types
const FETCH_ALL_DATA_BEGIN = "my-app/project/FETCH_ALL_DATA_BEGIN";
const FETCH_ALL_DATA_SUCCESS = "my-app/project/FETCH_ALL_DATA_SUCCESS";
const FETCH_ALL_DATA_FAILURE = "my-app/project/FETCH_ALL_DATA_FAILURE";

const CREATE_NEW_TEAM_BEGIN = "my-app/project/CREATE_NEW_TEAM_BEGIN";
const CREATE_NEW_TEAM_SUCCESS = "my-app/project/CREATE_NEW_TEAM_SUCCESS";
const CREATE_NEW_TEAM_FAILURE = "my-app/project/CREATE_NEW_TEAM_FAILURE";

const FETCH_SINGLE_TEAM_BEGIN = "my-app/project/FETCH_SINGLE_TEAM_BEGIN";
const FETCH_SINGLE_TEAM_SUCCESS = "my-app/project/FETCH_SINGLE_TEAM_SUCCESS";
const FETCH_SINGLE_TEAM_FAILURE = "my-app/project/FETCH_SINGLE_TEAM_FAILURE";

const SET_ACTIVE_TEAM = "my-app/project/SET_ACTIVE_TEAM";

const NEW_SESSION_STRING = "my-app/project/NEW_SESSION_STRING";

const UPD_ACTUAL_TEAM_CLICKS = "my-app/project/UPD_ACTUAL_TEAM_CLICKS";

const UPD_ACTUAL_TEAM_TOTAL_CLICKS =
  "my-app/project/UPD_ACTUAL_TEAM_TOTAL_CLICKS";

const UPDATE_TEAM_CLICKS = "my-app/project/UPDATE_TEAM_CLICKS";

type MapType = { [key: string]: any };

interface InitStateI {
  loading: boolean;
  error: any;
  teams: any; //delete
  mapTeamsById: { [key: string]: any };
  activeTeamId: any; // delete
  activeTeam: any;
  sessionString: string;
  newTeam: {
    loading: boolean;
    error: any;
    finished: boolean;
  };
}

const initialState: InitStateI = {
  loading: false,
  error: null,
  teams: [], //delete
  mapTeamsById: {},
  activeTeamId: undefined, // delete
  activeTeam: {},
  sessionString: "",
  newTeam: {
    loading: false,
    error: null,
    finished: false,
  },
};

// Reducer
export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    //FETCHING ALL DATA
    case FETCH_ALL_DATA_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        teams: [],
      };

    case FETCH_ALL_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        teams: action.payload.teams,
        mapTeamsById: action.payload.mapTeamsById,
      };

    case FETCH_ALL_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        teams: [],
      };

    //SINGLE ACTION UDPATED

    case SET_ACTIVE_TEAM:
      console.log("Activating Team: ", action.payload.teamObj);
      return {
        ...state,
        activeTeamId: action.payload.id,
        activeTeam: action.payload.teamObj,
      };

    case UPD_ACTUAL_TEAM_CLICKS:
      return {
        ...state,
        activeTeam: {
          ...state.activeTeam,
          totalClicks: action.payload.totalClicks,
          sessionClicks: action.payload.sessionClicks,
        },
      };

    case UPD_ACTUAL_TEAM_TOTAL_CLICKS: /// here
      return {
        ...state,
        activeTeam: {
          ...state.activeTeam,
          totalClicks: action.payload.totalClicks,
        },
      };

    case UPDATE_TEAM_CLICKS:
      let activeTotal = state.activeTeam.totalClicks
        ? state.activeTeam.totalClicks
        : 0;
      let sessionClicks = state.activeTeam.sessionClicks
        ? state.activeTeam.sessionClicks
        : 0;
      // if anyone else has active team the same as clicked, update his total Clicks
      if (state.activeTeam._id === action.payload.teamObj.teamId) {
        activeTotal = action.payload.teamObj.totalClicks;
      }

      // if click was caused by me and my sessionString, add to my clicks (sessionClicks)
      if (state.sessionString === action.payload.teamObj.sessionString) {
        sessionClicks = action.payload.teamObj.clicks;
      }
      return {
        ...state,
        activeTeam: {
          ...state.activeTeam,
          totalClicks: activeTotal,
          sessionClicks: sessionClicks,
        },
        mapTeamsById: {
          ...state.mapTeamsById,
          [action.payload.teamObj.teamId]: {
            ...state.mapTeamsById[action.payload.teamObj.teamId],
            totalClicks: action.payload.teamObj.totalClicks, //action.payload.teamObj,
          },
        },
      };

    case NEW_SESSION_STRING:
      return {
        ...state,
        sessionString: action.payload.str,
      };

    //CREATING NEW TEAM
    case CREATE_NEW_TEAM_BEGIN:
      return {
        ...state,
        newTeam: {
          ...state.newTeam,
          loading: true,
        },
      };

    case CREATE_NEW_TEAM_SUCCESS:
      return {
        ...state,
        newTeam: {
          ...state.newTeam,
          loading: false,
          finished: true,
        },
      };

    case CREATE_NEW_TEAM_FAILURE:
      return {
        ...state,
        newTeam: {
          ...state.newTeam,
          loading: false,
          error: ["Fail while creating new Team"],
        },
      };

    case FETCH_SINGLE_TEAM_BEGIN:
      return {
        ...state,
        activeTeam: {
          ...state.activeTeam,
          loading: true,
        },
      };

    case FETCH_SINGLE_TEAM_SUCCESS:
      console.log("Fetched one team: ", action.payload);

      return {
        ...state,
        activeTeam: {
          ...state.activeTeam,
          loading: false,
        },
      };

    case FETCH_SINGLE_TEAM_FAILURE:
      return {
        ...state,
        activeTeam: {
          ...state.activeTeam,
          error: ["Fail while loading this Team"],
        },
      };
    default:
      return state;
  }
}

// Action Creators

// FETCH Candidates
export function fetchAllData() {
  return (dispatch: any) => {
    dispatch(fetchAllDataBegin());
    return server
      .getData()
      .then((data) => data.json())
      .then((jsonData) => {
        console.log("Json data: ", jsonData);

        //REDUCER MAP BY _ID
        dispatch(fetchAllDataSuccess(jsonData));
      })
      .catch((error) => dispatch(fetchAllDataFailure(error)));
  };
}

export const fetchAllDataBegin = () => ({
  type: FETCH_ALL_DATA_BEGIN,
});

export const fetchAllDataSuccess = (teams: any) => ({
  type: FETCH_ALL_DATA_SUCCESS,
  payload: {
    teams: teams,
    mapTeamsById: reduceHelpers.mapTeamsById(teams),
  },
});

export const fetchAllDataFailure = (error: any) => ({
  type: FETCH_ALL_DATA_FAILURE,
  payload: { error },
});

//activating row team
export const setActiveRow = (id: any, teamObj: Team) => {
  console.log("Activating team start: ", teamObj);
  return {
    type: SET_ACTIVE_TEAM,
    payload: { id, teamObj },
  };
};

// FETCH Candidates
export function fetchCreateTeam(name: string) {
  return (dispatch: any) => {
    dispatch(fetchCreateTeamBegin());
    return server
      .createNewTeam(name)
      .then((data) => data.json())
      .then((jsonData) => {
        console.log("Json data: ", jsonData);

        //REDUCER MAP BY _ID
        dispatch(fetchCreateTeamSuccess());
        dispatch(setActiveRow(jsonData._id, jsonData));
      })
      .catch((error) => dispatch(fetchCreateTeamFailure()));
  };
}

export const fetchCreateTeamBegin = () => ({
  type: CREATE_NEW_TEAM_BEGIN,
});

export const fetchCreateTeamSuccess = () => ({
  type: CREATE_NEW_TEAM_SUCCESS,
});

export const fetchCreateTeamFailure = () => ({
  type: CREATE_NEW_TEAM_FAILURE,
});

// FETCH Candidates
export function getTeamByUrlName(urlName: string, sessionStr?: string) {
  return (dispatch: any) => {
    dispatch(fetchSingleTeamBegin());
    return server
      .fetchTeamByUrl(urlName, sessionStr)
      .then((data) => data.json())
      .then((jsonData) => {
        console.log("Json data: getTeamByUrlName", jsonData);

        dispatch(fetchSingleTeamSuccess(jsonData));
        dispatch(setActiveRow(jsonData._id, jsonData));
      })
      .catch((error) => dispatch(fetchSingleTeamFailure()));
  };
}

export const fetchSingleTeamBegin = () => ({
  type: FETCH_SINGLE_TEAM_BEGIN,
});

export const fetchSingleTeamSuccess = (data: Team) => ({
  type: FETCH_SINGLE_TEAM_SUCCESS,
});

export const fetchSingleTeamFailure = () => ({
  type: FETCH_SINGLE_TEAM_FAILURE,
});

//Create session string
export const createSessionString = () => {
  let newSessionStr = new Date().getTime().toString() + Math.random();
  return {
    type: NEW_SESSION_STRING,
    payload: {
      str: newSessionStr,
    },
  };
};

// //Actualisation
// export const actualClicksOnActiveTeam = (
//   totalClicks: number,
//   sessionClicks: number
// ) => {
//   return {
//     type: UPD_ACTUAL_TEAM_CLICKS,
//     payload: {
//       totalClicks: totalClicks,
//       sessionClicks: sessionClicks,
//     },
//   };
// };

//update Team by Id
export const updateTeamById = (teamObj: any) => {
  return {
    type: UPDATE_TEAM_CLICKS,
    payload: {
      teamObj: teamObj,
    },
  };
};

// //update Team by Id

// export const updateActiveTeamTotalClicks = (totalClicks: number) => {
//   return {
//     type: UPD_ACTUAL_TEAM_TOTAL_CLICKS,
//     payload: {
//       totalClicks: totalClicks,
//     },
//   };
// };
