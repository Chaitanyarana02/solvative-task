const express = require('express');
const app = express();
const port = 3000;
const useCases = require('./use-cases')
app.use(express.json());

// Define routes
app.get('/', async (req, res) => {
  const response = await useCases.test({name: 'rana'})
  res.send(`Hello ${response}`);
});

// api to create user
app.post('/user', async (req, res) => {
  const name = req.body.name;
  try {
    const response = await useCases.createUser({name});
    res.send(response);
  } catch (e) {
    res.send(e.message);
  }
});

// api to update user
app.put('/user/:id', async (req, res) => {
  const name = req.body.name;
  const id = req.params.id;
  try {
    const response = await useCases.updateUser({name, id});
    res.send(response);
  } catch (e) {
    res.send(e.message);
  }
});

app.get('/user', async (req, res) => {
  const id = req.params.id;
  try {
    const response = await useCases.getAllUsers();
    res.send(response);
  } catch (e) {
    res.send(e.message);
  }
});

app.get('/user/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const response = await useCases.getUser({id});
    res.send(response);
  } catch (e) {
    res.send(e.message);
  }
});

app.get('/user/:id/p5-history', async (req, res) => {
  const id = req.params.id;
  try {
    const response = await useCases.getP5History({id});
    res.send(response);
  } catch (e) {
    res.send(e.message);
  }
});

app.post('/user/:id/give-reward', async (req, res) => {
  const rewardGiver = req.params.id;
  const rewardReceiver = req.body.rewardReceiver;
  const amount = req.body.amount;
  try {
    const response = await useCases.giveReward({rewardGiver, rewardReceiver, amount});
    res.send(response);
  } catch (e) {
    res.send(e.message);
  }
});

app.get('/user/:id/reward-history', async (req, res) => {
  const id = req.params.id;
  try {
    const response = await useCases.getRewardHistory({id});
    res.send(response);
  } catch (e) {
    res.send(e.message);
  }
});

app.delete('/p5/:id', async (req, res) => {
  const p5Id = req.params.id;
  try {
    const response = await useCases.deleteGivenP5({p5Id});
    res.send(response);
  } catch (e) {
    res.send(e.message);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
