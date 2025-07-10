const express = require("express");
const URL = require("../models/url");

const router = express.Router();

router.get("/", async (req, res) => {
  const allurls = await URL.find({});
  return res.render("home", {
    urls: allurls,
    id: null,
  });
});

router.get("/delete-all", async (req, res) => {
  await URL.deleteMany({});
  res.send("✅ All URL entries have been deleted.");
});


module.exports = router;
