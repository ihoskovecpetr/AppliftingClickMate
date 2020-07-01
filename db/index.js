"use strict";

const helpers = require("./helpers");

//Collections
const Team = require("../ModelsMongoose/Team");
const Vote = require("../ModelsMongoose/Vote");

// *******************************************************************************************
// get all data
// *******************************************************************************************
exports.getAllData = async () => {
  const allTeams = await Team.find(
    {},
    { name: true, urlName: true, clicks: true }
  ).lean();

  const allVotes = await Vote.find({}, { teamId: true, clicks: true }).lean();

  //creating map of Votes By TeamId
  const mapVoteByTeamId = allVotes.reduce((acumul, currentValue) => {
    if (acumul[currentValue.teamId]) {
      acumul[currentValue.teamId].push(currentValue);
    } else {
      acumul[currentValue.teamId] = [currentValue];
    }
    return acumul;
  }, {});

  //adding total clicks to each team
  allTeams.map((team) => {
    let totalClicks = 0;
    if (mapVoteByTeamId[team._id]) {
      mapVoteByTeamId[team._id].map((voter) => {
        totalClicks = totalClicks + voter.clicks;
      });
    }
    team.totalClicks = totalClicks;
    return team;
  });

  //sorting teams by totalClicks value
  allTeams.sort(helpers.compareTotalClicks);
  return allTeams;
};

// *******************************************************************************************
// single team data
// *******************************************************************************************
exports.getSingleTeam = async (urlName, sessionStr) => {
  const singleTeam = await Team.findOne(
    { urlName: urlName },
    { name: true, urlName: true, clicks: true }
  ).lean();

  //Get this session votes for this Team
  let sessionClicks = 0;
  const sessionVote = await Vote.findOne({
    teamId: singleTeam._id,
    sessionString: sessionStr,
  });

  if (sessionVote) {
    sessionClicks = sessionVote.clicks;
  }

  //Get all votes for this Team
  const teamVotes = await Vote.find({ teamId: singleTeam._id });

  //Count all votes for this Team
  let totalClicks = 0;
  if (teamVotes) {
    teamVotes.map((voter) => {
      totalClicks = totalClicks + voter.clicks;
    });
  }

  singleTeam.totalClicks = totalClicks;
  singleTeam.sessionClicks = sessionClicks;

  return singleTeam;
};
