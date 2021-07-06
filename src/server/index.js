var path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
const dotenv = require("dotenv");
dotenv.config();
var https = require("follow-redirects").https;
var fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const { createSecretKey } = require("crypto");
const app = express();

/* Middleware*/
// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.static("dist"));

//define routes
app.get("/", function (req, res) {
  res.sendFile(path.resolve("dist/index.html"));
});

app.get("/test", (req, res) => {
  res.send(mockAPIResponse);
});

app.post("/test", (req, res) => {
  var options = {
    method: "POST",
    hostname: "api.meaningcloud.com",
    path: `/sentiment-2.1?key=${
      process.env.key
    }&lang=en&ilang=en&txt=${encodeURIComponent(req.body.text)}`,
    headers: {},
    maxRedirects: 20,
  };
  console.log(options.path);

  var req = https.request(options, function (response) {
    var chunks = [];

    response.on("data", function (chunk) {
      chunks.push(chunk);
    });

    response.on("end", function (chunk) {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
      res.send(body.toString());
    });

    response.on("error", function (error) {
      // console.error(error);
    });
  });

  req.end();
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log("Example app listening on port 8081!");
});
