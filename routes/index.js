var express = require("express");
var path = require("path");

const db = require("../db");
// const { io } = require("../app");

var Team = require("../ModelsMongoose/Team.js");
var Vote = require("../ModelsMongoose/Vote.js");

var router = express.Router();

/* GET home page. */
router.get("/data", async (req, res, next) => {
  try {
    const result = await db.getAllData();
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
});

/* POST get single team data. */
router.post("/singleTeam/:urlName", async (req, res, next) => {
  try {
    console.log("Hitting singleTeam/:urlName", req, req.params.urlName);
    const result = await db.getSingleTeam(
      req.params.urlName,
      req.body.sessionStr
    );
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
});

/* POST create new team. */
router.post("/newTeam", async (req, res, next) => {
  try {
    console.log("Hitting /api/newTeam", req.body);
    let team = new Team({
      urlName: req.body.url,
      name: req.body.name,
    });
    console.log("going to save new Team: ");
    team.save((err, result) => {
      console.log("SAVED RESULT and ERR: ", result, err);
      if (result) {
        res.status(200).json({ success: true, ...result._doc });
      } else {
        res.status(200).json({ success: false, ...err });
      }
    });

    // console.log(("data new Team: ", result));
  } catch (e) {
    console.log("New Team ERROR: ", e);
    next(e);
  }
});

/* POST create new team. */
router.post("/klik", async (req, res, next) => {
  try {
    console.log("Hitting /api/klik", req.body);
    let existingVote = await Vote.findOne({
      teamId: req.body.teamId,
      sessionString: req.body.sessionStr,
    });

    let teamClicks = await Vote.find(
      {
        teamId: req.body.teamId,
      },
      { clicks: true }
    );

    let totalClicks = 0;
    teamClicks.map((voter) => {
      totalClicks = totalClicks + voter.clicks;
    });
    totalClicks = totalClicks + 1;

    // If there already exists vote with sessionString and teamId, just update values, else create new vote
    if (existingVote) {
      Vote.findByIdAndUpdate(
        existingVote._doc._id,
        { clicks: existingVote._doc.clicks + 1 },
        (err, result) => {
          console.log("UPDATING FINALE: ", result, err);
          if (result) {
            res.status(200).json({
              success: true,
              // ...result._doc,
              // clicks: existingVote._doc.clicks + 1,
              // totalClicks: totalClicks,
            });
            req.io.sockets.emit("clicked", {
              success: true,
              ...result._doc,
              clicks: existingVote._doc.clicks + 1,
              totalClicks: totalClicks,
            });
          } else {
            res.status(200).json({ success: false, ...err });
          }
        }
      );
    } else {
      let newVote = new Vote({
        teamId: req.body.teamId,
        sessionString: req.body.sessionStr,
        clicks: 1,
      });
      newVote.save((err, result) => {
        if (result) {
          res.status(200).json({
            success: true,
          });
          req.io.sockets.emit("clicked", {
            success: true,
            ...result._doc,
            totalClicks: totalClicks,
          });
        } else {
          res.status(200).json({ success: false, ...err });
        }
      });
    }

    // socket.emit("clicked", "can you hear me?", 1, 2, "abc");

    // console.log(("data new Team: ", result));
  } catch (e) {
    console.log("klik ERROR catch: ", e);
    next(e);
  }
});

module.exports = router;
