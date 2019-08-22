const express = require('express');
const bodyParser = require('body-parser');
const os = require('os');
const path = require('path');
cors = require('cors'),
fileUpload = require('express-fileupload'),
{ uploadToHdfs, uploadToMongo, sendToKafka } = require('./utils/functions'),
{ mongoretailerCollection } = require('./mongo/mongo'),
{
  getVolume, getPriceChange, getretailersData, getretailerInvoicesSummary
} = require('./mongo/queries'),
{
  createAssociation, getAssociation, createModel, getPred,getResults
} = require('./mongo/bigml'),
{ test } = require('./mongo/items');
var model;

const app = express();
let resourceID;
let datasetID;
let modelID;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('dist'));
app.use(fileUpload());

app.post('/upload', (req, res, next) => {
  const uploadFile = req.files.file;
  const fileName = req.files.file.name;
  uploadFile.mv(
    `tmp/${fileName}`, (err) => {
      if (err) {
        res.status(200).send('error occoured!');
      } else {
        try {
          sendToKafka(fileName);
          uploadToHdfs(uploadFile.data, fileName);
          uploadToMongo(fileName);
          mongoretailerCollection(fileName);
          next();
        } catch (e) {
          console.log(e);
        }
      }
    }
  );
});

app.get('/createAss', (req, res) => {
  createAssociation(res, (result) => {
    resourceID = JSON.parse(result).resource;
    res.status(200).send(resourceID);
  });
});
app.get('/getAss', (req, res) => {
  getAssociation(resourceID, res, (result) => {
    datasetID = JSON.parse(result).resource;
    res.status(200).send(datasetID);
  });
});
app.get('/createMod', (req, res) => {
  createModel(datasetID, res, (result) => {
    modelID = JSON.parse(result).resource;
    res.status(200).send(modelID);
  });
});
app.get('/getPred', (req, res) => {
  getPred(modelID, res, (result) => {
    model = JSON.parse(result).probabilities;
    res.status(200).send(model);
  });
});
app.get('/results', async (req, res) => {
  getResults(model,res,(result) => {
    res.status(200).send(model);
  });
});
app.get('/retailers', async (req, res) => {
  getretailersData((result) => {
    res.status(200).send(result);
  });
});

app.get('/:retailerId', async (req, res) => {
  if (!req.params.retailerId) {
    res.status(404).send();
  } else {
    const retailer = req.params.retailerId;
    getretailerInvoicesSummary(retailer, (result) => {
      res.status(200).send(result);
    });
  }
});

app.post('/product-volume', async (req, res) => {
  if (!req.body) {
    res.send('no body');
  }
  console.log(req.body);
  const { productName } = req.body;
  const { start } = req.body;
  const { end } = req.body;

  getVolume(productName, start, end, (result) => {
    res.status(200).send(result);
  });
});

app.post('/product-price', async (req, res) => {
  if (!req.body) {
    res.send('no body');
  }
  console.log(req.body);
  const { productName } = req.body;
  const { start } = req.body;
  const { end } = req.body;

  getPriceChange(productName, start, end, (result) => {
    res.status(200).send(result);
  });
});




app.listen(process.env.PORT || 8080, () => console.log(`server running on port ${process.env.PORT || 8080}!`));
