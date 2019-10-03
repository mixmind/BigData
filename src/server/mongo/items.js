const { MongoClient } = require('mongodb');
const assert = require('assert');
// eslint-disable-next-line no-unused-vars
const path = require('path');
const fs = require('fs');

const dbUrl = 'mongodb://mongoadmin:secret@localhost:27017';


function exportData() {
  let db;
  const file = fs.createWriteStream('tovar.csv');
  const first1 = 'date,invoiceNum,item,item,item,item,item,item,item,item,item\n';
  fs.appendFile(
    'tovar.csv',
    first1,
    (err) => {
      if (err) throw err;
    }
  );
  MongoClient.connect(dbUrl, { useNewUrlParser: true }, (err, client) => {
    console.log('Connected correctly to server');
    db = client.db('BigData');
    // eslint-disable-next-line no-shadow,consistent-return
    const res = db.collection('Invoices').find().forEach(
      (result) => {
        try {
          let line = `${result.date} ,${result.invoiceNumber} ,`;
          result.items.forEach((item, key) => {
            if (result.items.length - 1 === key) line += `${item.id}`;
            // eslint-disable-next-line no-useless-concat
            else line += `${item.id}` + ',';
          });
          line += '\n';
          fs.appendFile(
            'tmp/tovar.csv',
            line,
            // eslint-disable-next-line no-shadow
            (err) => {
              if (err) throw err;
            }
          );
        } catch (e) {
          console.log(e);
        }
      }
    );
  });
}

module.exports = { exportData };

