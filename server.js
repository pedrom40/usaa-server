const sleep = require('./helpers');
const express = require('express');
const morgan = require('morgan');

const app = express();

// Logging
app.use(morgan('common'));

// CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});

app.get('/home', (req, res) => {
  sleep(2000);

  if (Math.random() < 0.25) {
    res.status(500).send({ error: 'Something went wrong when fetching home content...' })
  }

  res.json({content: `Content for home page...`});

});

app.get('/paycheck-planner', (req, res) => {
  sleep(2000);

  if (Math.random() < 0.25) {
    res.status(500).send({ error: 'Something went wrong when fetching paycheck planner content...' })
  }

  res.json({content: `Content for paycheck planner page...`});

});

app.get('/savings-booster', (req, res) => {
  sleep(2000);

  if (Math.random() < 0.25) {
    res.status(500).send({ error: 'Something went wrong when fetching savings booster content...' })
  }

  res.json({content: `Content for savings booster page...`});

});

app.listen(8080, () => {
  console.log(`Your app is listening on port 8080`);
});