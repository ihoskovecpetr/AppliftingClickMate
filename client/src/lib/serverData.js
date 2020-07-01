import { toUrlString } from "./helpers.js";
const CHAMELEON_API = `/api/v1/chameleon`;

//**********************************************************************************************************************
// GET ALL TEAMS DATA
//**********************************************************************************************************************

export async function getData(_id) {
  const a = await fetch("/api/data", {
    method: "GET",
    mode: "cors",
    cache: "default",
  });
  console.log("got all data ", a);
  return a;
}

//**********************************************************************************************************************
// GET ALL TEAMS DATA
//**********************************************************************************************************************

export async function createNewTeam(name) {
  const a = await fetch(`/api/newTeam`, {
    method: "POST",
    mode: "cors",
    cache: "default",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: toUrlString(name),
      name: name,
    }),
  });
  console.log("create a new team ", a);
  return a;
}

//**********************************************************************************************************************
// GET SINGLE TEAM DATA
//**********************************************************************************************************************

export async function fetchTeamByUrl(urlName, sessionStr) {
  const a = await fetch(`/api/singleTeam/${urlName}`, {
    method: "POST",
    mode: "cors",
    cache: "default",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sessionStr: sessionStr,
    }),
  });
  return a;
}

//**********************************************************************************************************************
// SEND CLICK
//**********************************************************************************************************************

export async function sendClick(teamId, sessionStr) {
  const a = await fetch(`/api/klik`, {
    method: "POST",
    mode: "cors",
    cache: "default",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      teamId: teamId,
      sessionStr: sessionStr,
    }),
  });
  return a;
}
