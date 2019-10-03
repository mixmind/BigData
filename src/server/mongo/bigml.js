const util = require('util');
const exec = util.promisify(require('child_process').exec);
assert = require('assert');

let resource; //= 'source/5d5c62c6e47684734100cec5';
let dataset; //= 'dataset/5d5c64955299630520001b94';
let model; //= 'model/5d5c65a1e47684734100cee6';
let pred;

async function createAssociation(res, callBack) {
  try {
    console.log('Create association');
    const {stdout,stderr} = await exec('curl -X POST "https://bigml.io/andromeda/source?username=mixadence;api_key=f493645d34aac96d0bfa6220e24e06fa52649921" -F file=@tmp/tovar.csv');
      if (stdout) {
      return callBack(stdout);
      }
      else
        console.error(stderror);
    }
   catch (error) {
    console.error(error);
  }
}

async function getAssociation(resourceID, res, callBack) {
  try {
    console.log('Get association');
   const {stdout,stderr} =  await exec(`curl "https://bigml.io/andromeda/dataset?username=mixadence;api_key=f493645d34aac96d0bfa6220e24e06fa52649921" -X POST -H 'content-type: application/json' -d '{"source": "${resourceID}"}'`)
 if (stdout) {
      return callBack(stdout);
      }
      else
        console.error(stderror);
    }

   catch (error) {
    console.error(error);
  }
}
async function createModel(datasetID, res, callBack) {
  try {
    console.log('Create model');
    const {stdout,stderr} = await exec(`curl "https://bigml.io/andromeda/model?username=mixadence;api_key=f493645d34aac96d0bfa6220e24e06fa52649921" -X POST -H 'content-type: application/json' -d '{"dataset": "${datasetID}"}'`)
 if (stdout) {
      return callBack(stdout);
      }
      else
        console.error(stderror);
} catch (error) {
    console.error(error);
  }
}
async function getPred(modelID, res, callBack) {
  try {
    console.log('Get prediction');
  const {stdout,stderr} =  await exec(`curl "https://bigml.io/andromeda/prediction?username=mixadence;api_key=f493645d34aac96d0bfa6220e24e06fa52649921" -X POST -H 'content-type: application/json' -d '{"model": "${modelID}", "input_data": {"item": "potato", "item": "eggs L"}}'`)
 if (stdout) {
      model = stdout;
      pred = JSON.parse(stdout).probabilities;
      return callBack(stdout);
      }
      else{
       console.error(stderror);
}
  } catch (error) {
console.error(error);
  }
}

async function getResults(model,res, callBack) {
  return callBack(model);
}

module.exports = {
createAssociation, getAssociation, getPred, createModel, getResults
};
