const MongoClient = require('mongodb').MongoClient,
assert = require('assert');


const dbUrl = 'mongodb://mongoadmin:secret@localhost:27017';

let db;

const retailers = ["Rami Levy - Hashikma Marketing", "Mega", "Shufersal", "Hazi-Hinam", "Osher ad",
          "Victory", "Tiv-Taam", "AM:PM"];

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  function getVolume(productName, start, end, callBack) {
  MongoClient.connect(dbUrl, { useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    db = client.db("BigData");

  let retailerProductCount = [];
    let res = db.collection("retailers").find({
      invoices: {
          $elemMatch: {
            date: {$gte: new Date(start).toISOString(),
                  $lt: new Date(end).toISOString()}}},
    }).toArray(function(err, result) {
        if (err) throw err;

        for (res of result) {
          let elem = {
            retailer: res["provider"],
            volume: 0
          }
          for (invoice of res["invoices"]) {
            for (item of invoice["items"]) {
              if (item.id == productName) {
                elem['volume']++;
              }
            }
          }
          retailerProductCount.push(elem)
        }
        for (const retailer of retailers) {
          if (!retailerProductCount.some(item => item.retailer === retailer)) {
            let newretailer = {
              retailer: retailer,
              volume: 0
            }
            retailerProductCount.push(newretailer);
          }
        }
        return callBack(retailerProductCount);
      });
    });
}

  function getPriceChange(productName, start, end, callBack) {
    MongoClient.connect(dbUrl, { useNewUrlParser: true }, function(err, client) {
      assert.equal(null, err);
      console.log("Connected correctly to server");
      db = client.db("BigData");

    let productPrices = [];
      let res = db.collection("retailers").find({
        invoices: {
            $elemMatch: {
              date: {$gte: new Date(start).toISOString(),
                    $lt: new Date(end).toISOString()}}},
      }).toArray(function(err, result) {
          if (err) throw err;

          for (res of result) {
            let elem = {
              retailer: res["provider"],
              prices: 0
            }
            for (invoice of res["invoices"]) {
              for (item of invoice["items"]) {
                if (item.id == productName) {
                  elem['prices'] = item.price;
                }
              }
            }
            productPrices.push(elem)
          }
          for (const retailer of retailers) {
            if (!productPrices.some(item => item.retailer === retailer)) {
              let newretailer = {
                retailer: retailer,
                prices: 0
              }
              productPrices.push(newretailer);
            }
          }
          return callBack(productPrices);
        });
      });
  }

  function getretailersData(callBack) {
    MongoClient.connect(dbUrl, { useNewUrlParser: true }, function(err, client) {
      assert.equal(null, err);
      console.log("Connected correctly to server");
      db = client.db("BigData");

      let retailersData = [];

      db.collection("retailers").find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);

        for (res of result) {
          let retailer = {
            name: res.provider,
            orders: res.totalOrders,
            sum: res.totalSum
          }
          retailersData.push(retailer);
        }

        for (const retailer of retailers) {
          if (!retailersData.some(item => item.name === retailer)) {
            let newretailer = {
              name: retailer,
              orders: 0,
              sum: 0
            }
            retailersData.push(newretailer);
          }
        }

        return callBack(retailersData);
      });
    })
  }

  function getretailerInvoicesSummary(retailer, callBack) {
    MongoClient.connect(dbUrl, { useNewUrlParser: true }, function(err, client) {
      assert.equal(null, err);
      console.log("Connected correctly to server");
      db = client.db("BigData");


      let res = db.collection("retailers").find({
        provider: retailer
      }).toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
          let invoices = [];
          if (result.length == 0) {
            return callBack(result);
          }

          for (const m of months) {
            let month = {
              month: m,
              count: 0
            }
            invoices.push(month);
          }

          for (const invoice of result[0]['invoices']) {
            let date = new Date(invoice['date']);
            let m = months[date.getMonth()];
            let index = invoices.findIndex(x => x.month === m);
            invoices[index].count++;
          }

          return callBack(invoices);
      });
    });
  };

module.exports = {getVolume, getPriceChange, getretailersData, getretailerInvoicesSummary};
