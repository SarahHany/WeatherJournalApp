// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Start up an instance of app
const app = express();
app.use(cors());
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8000;
app.listen(port, listening);

function listening() {
  console.log(`running on localhost: http://localhost:${port}`);
}

//   if (projectData) res.send(projectData);

app.get("/all", (req, res) => {
  res.send(projectData).status(200).end();
});

app.post("/add", (req, res) => {
  projectData = {
    temp: req.body.temp,
    date: req.body.date,
    content: req.body.content,
  };
  res.send(projectData).status(200).end();

  //  data = {temp: req.body.temp,
  //     date: req.body.date,
  //     feeling: req.body.feeling
  // projectData = {
  //   temp: req.body.temp,
  //   date: req.body.date,
  //   feeling: req.body.feeling,
  // };

  // res.send(projectData);
});
