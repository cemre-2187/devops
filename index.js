const express = require('express')
const app = express()

const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/.env` });
const port = process.env.PORT || 3000;
const addService = require('./addService');
const client = require('prom-client');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/html'));

app.get('/sum', (req, res) => {
   //var SastTest;
  // eval is a dangerous function for security. Example: Code Injection
   //eval("console.log('Hello Sast!');");
  const { numberOne, numberTwo } = req.query;
  let result = addService(numberOne, numberTwo);
  res.status(200).send(result)
})
//prometheus
app.get('/metrics', (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(client.register.metrics());
});

app.post('/alert', (req, res) => {
  console.log(req.body,"-", req.query)

 res.status(200).send("OK")
})


app.use('*', (req, res) => {
  res.status(404).send({ message: "404 Not Found" })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})