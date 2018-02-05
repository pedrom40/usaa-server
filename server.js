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

// sleep delay for all
app.use(function (req, res, next) {
  sleep(2000);
  next();
});


app.get('/home', (req, res) => {

  if (Math.random() < 0.25) {
    res.status(500).send({ error: 'Something went wrong when fetching home content...' })
  }

  res.json({content: `Content for home page...`});

});

app.get('/paycheck-planner', (req, res) => {

  // if (Math.random() < 0.25) {
  //   res.status(500).send({ error: 'Something went wrong when fetching paycheck planner content...' })
  // }

  res.json({content: `Content for paycheck planner page...`});

});
app.get('/paycheck-planner/notices', (req, res) => {
  const notices = [
    {
      id: 1,
      type: `ManageEvent`,
      onConfirm: `View`,
      onCancel: `Close`,
      title: `Notice 1`,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et accumsan tellus, non fermentum est. In sed dapibus libero.`,
      button1: `Go to Event`,
      button2: `Dismiss`
    },
    {
      id: 2,
      type: `Event`,
      onConfirm: `AddEvent`,
      onCancel: `Close`,
      title: `Notice 2`,
      description: `Vivamus at quam et risus pharetra laoreet et non tellus. Ut facilisis magna quis erat aliquet hendrerit.`,
      button1: `Add Event`,
      button2: `Dismiss`
    },
    {
      id: 3,
      type: `Contact`,
      onConfirm: `OpenEmail`,
      onCancel: `Dashboard`,
      title: `Notice 3`,
      description: `Praesent feugiat nisi ut velit iaculis, eget accumsan mauris pulvinar. Vivamus vitae ex congue.`,
      button1: `Go to Event`,
      button2: `Email Us`
    }
  ];
  res.json({notices});
});

app.get('/savings-booster', (req, res) => {

  // if (Math.random() < 0.25) {
  //   res.status(500).send({ error: 'Something went wrong when fetching savings booster content...' })
  // }

  res.json({content: `Content for savings booster page...`});

});
app.get('/savings-booster/messages', (req, res) => {
  const messages = [
    {
      id: 1,
      type: `Message`,
      onConfirm: `Clear`,
      onCancel: 'Dismiss',
      title: `Message 1`,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et accumsan tellus, non fermentum est. In sed dapibus.`,
      button1: `Read More...`,
      button2: `Dismiss`
    },
    {
      id: 2,
      type: `Service`,
      onConfirm: `Activate`,
      onCancel: `Close`,
      title: `Message 2`,
      description: `Vivamus at quam et risus pharetra laoreet et non tellus. Ut facilisis magna quis erat aliquet hendrerit.`,
      button1: `Turn On`,
      button2: `Dismiss`
    },
    {
      id: 3,
      type: `Contact`,
      onConfirm: `Contact`,
      onCancel: `Close`,
      title: `Message 3`,
      description: `Praesent feugiat nisi ut velit iaculis, eget accumsan mauris pulvinar. Vivamus vitae ex congue, faucibus.`,
      button1: `Yes Please!`,
      button2: `No Thanks`
    }
  ];
  res.json({messages});
});


app.listen(8080, () => {
  console.log(`Your app is listening on port 8080`);
});