const { exec } = require('child_process');

let resourceID = 'source/5d5c62c6e47684734100cec5';
let datasetID = 'dataset/5d5c64955299630520001b94';
let modelID = 'model/5d5c65a1e47684734100cee6';

function createAssociation(res) {
  try {
    console.log('Create association');
    exec('curl -X POST "https://bigml.io/andromeda/source?username=mixadence;api_key=f493645d34aac96d0bfa6220e24e06fa52649921" -F file=@tovar.csv', (err, stdout, stderr) => {
      resourceID = JSON.parse(stdout).resource;
      console.log(resourceID);
      if (err) {
        console.log(err);
      }
    });
  } catch (error) {
    console.error(error);
  }
  return resourceID;
}

function getAssociation(res) {
  try {
    console.log('Get association');
    console.log(resourceID);
    exec(`curl "https://bigml.io/andromeda/dataset?username=mixadence;api_key=f493645d34aac96d0bfa6220e24e06fa52649921" -X POST -H 'content-type: application/json' -d '{"source": "${resourceID}"}'`, (err, stdout, stderr) => {
      datasetID = JSON.parse(stdout).resource;
      console.log(datasetID);
      if (err) {
        console.log(err);
      }
    });
  } catch (error) {
    console.error(' already exists in hdfs');
  }
}
function createModel(res) {
  try {
    console.log('Create model');
    exec(`curl "https://bigml.io/andromeda/model?username=mixadence;api_key=f493645d34aac96d0bfa6220e24e06fa52649921" -X POST -H 'content-type: application/json' -d '{"dataset": "${datasetID}"}'`, (err, stdout, stderr) => {
      console.log(stdout);
      modelID = JSON.parse(stdout).resource;
      console.log(modelID);
      if (err) {
        console.log(err);
      }
    });
  } catch (error) {
    console.error(' already exists in hdfs');
  }
}
function getPred() {
  try {
    console.log('Get prediction');
    exec(`curl "https://bigml.io/andromeda/prediction?username=mixadence;api_key=f493645d34aac96d0bfa6220e24e06fa52649921" -X POST -H 'content-type: application/json' -d '{"model": "${modelID}", "input_data": {"item": "potato", "item": "eggs L"}}'`, (err, stdout, stderr) => {
      console.log(stdout);
      modelID = JSON.parse(stdout).confidences;
      console.log(modelID);
      if (err) {
        console.log(err);
      }
    });
  } catch (error) {
    console.error(' already exists in hdfs');
  }
}

module.exports = {
  createAssociation, getAssociation, getPred, createModel
};
