const express = require('express')
const app = express()
const fs = require('fs');

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

const histogram = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds histogram',
  labelNames: ['method', 'route', 'code'],
  buckets: [1, 2, 5, 6, 10]
});

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const elapsed = Date.now() - start;
    histogram.labels(req.method, req.route.path, res.statusCode).observe(elapsed / 1000);
  });
  next();
});

app.get('/sum', (req, res) => {
   //var SastTest;
  // eval is a dangerous function for security. Example: Code Injection
   //eval("console.log('Hello Sast!');");
  const { numberOne, numberTwo } = req.query;
  let result = addService(numberOne, numberTwo);
  res.status(200).send(result)
})
//prometheus
app.get('/metrics', async(req, res) => {
  res.set('Content-Type', client.register.contentType);
  const metrics = await client.register.metrics();
  res.end(metrics);
});

app.post('/alert', (req, res) => {
  
  const data =JSON.stringify(req.body)+"\n\n\n\n";

  fs.appendFile('alerts.txt', data, (err) => {
    if (err) throw err;
    console.log('Veri dosyaya başarıyla eklendi.');
  });
  
 res.status(200).send("OK")
})


app.use('*', (req, res) => {
  res.status(404).send({ message: "404 Not Found" })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})