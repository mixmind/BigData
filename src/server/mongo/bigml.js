const { exec } = require('child_process');
assert = require('assert');

let resource; //= 'source/5d5c62c6e47684734100cec5';
let dataset; //= 'dataset/5d5c64955299630520001b94';
let model; //= 'model/5d5c65a1e47684734100cee6';
let pred;

function createAssociation(res, callBack) {
  try {
    console.log('Create association');
    exec('curl -X POST "https://bigml.io/andromeda/source?username=mixadence;api_key=f493645d34aac96d0bfa6220e24e06fa52649921" -F file=@src/server/mongo/tovar.csv', (err, stdout, stderr) => {
      if (err) {
        console.log(err);
      }
      return callBack(stdout);
    });
  } catch (error) {
    console.error(error);
  }
}

function getAssociation(resourceID, res, callBack) {
  try {
    console.log('Get association');
    exec(`curl "https://bigml.io/andromeda/dataset?username=mixadence;api_key=f493645d34aac96d0bfa6220e24e06fa52649921" -X POST -H 'content-type: application/json' -d '{"source": "${resourceID}"}'`, (err, stdout, stderr) => {
      if (err) {
        console.log(err);
      }
      return callBack(stdout);
    });
  } catch (error) {
    console.error(error);
  }
}
function createModel(datasetID, res, callBack) {
  try {
    console.log('Create model');
    exec(`curl "https://bigml.io/andromeda/model?username=mixadence;api_key=f493645d34aac96d0bfa6220e24e06fa52649921" -X POST -H 'content-type: application/json' -d '{"dataset": "${datasetID}"}'`, (err, stdout, stderr) => {
      if (err) {
        console.log(err);
      }
      return callBack(stdout);
    });
  } catch (error) {
    console.error(error);
  }
}
function getPred(modelID, res, callBack) {
  try {
    console.log('Get prediction');
    exec(`curl "https://bigml.io/andromeda/prediction?username=mixadence;api_key=f493645d34aac96d0bfa6220e24e06fa52649921" -X POST -H 'content-type: application/json' -d '{"model": "${modelID}", "input_data": {"item": "potato", "item": "eggs L"}}'`, (err, stdout, stderr) => {
      model = stdout;
      if (err) {
        console.log(err);
      }
      pred = JSON.parse(stdout).probabilities;
      return callBack(stdout);
    });
  } catch (error) {
    console.error(error);
  }
}

function getResults(model,res, callBack) {
  return callBack(model);
}

module.exports = {
  createAssociation, getAssociation, getPred, createModel, getResults
};
