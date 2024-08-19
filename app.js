import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send("We're up and running");
});

const PORT = 3000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
