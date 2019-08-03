const  MongoClient = require('mongodb').MongoClient,
        axios = require('axios'),
        kafka = require('kafka-node'),
        fs = require('fs');

  async function uploadToHdfs(invoice, fileName) {
    try {
		console.log("entered hdfs");
      const response = await axios.put(
          `http://172.19.0.2:50075/webhdfs/v1/invoices/${fileName}?op=CREATE&namenoderpcaddress=172.19.0.2:8020&createflag=&createparent=true&overwrite=false&user.name=root`,
          invoice
        );
        if (response) {
          console.log("Invoice upload to hdfs");
        }
    } catch (error) {
      console.error(`${fileName} already exists in hdfs`);
    }
  }

  function uploadToMongo(fileName) {
    const dbUrl = 'mongodb://mongoadmin:secret@localhost:27017';
    var file = fs.readFileSync(`tmp/${fileName}`);
    let invoice = JSON.parse(file);
		console.log("entered mongo");

    MongoClient.connect(dbUrl,{ useNewUrlParser: true }, function(err, db) {
	  if (err) throw err;
      var dbo = db.db("BigData");
      dbo.collection("Invoices").insertOne(invoice, function(err, res) {
        if (err) throw err;
        console.log(`${fileName} insert to invoices collection`);
        db.close();
      });
    });
  }

  async function sendToKafka(fileName) {
    console.log("publish to kafka consumer...");
    var file = fs.readFileSync(`tmp/${fileName}`);
    let invoice = JSON.parse(file);

    let body = {
      records:[
        {value: invoice}
      ]
    }

    try {
      const options = {
        method: "POST",
        url: 'http://35.208.177.111:8082/topics/bigdata',
        data: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/vnd.kafka.json.v2+json'
        }
      }
      const response = await axios(options);
      if (response) {
        console.log("invoice published to kafka!");
      }
    } catch (error) {
      console.log(error);
      console.error("something went wrong sending to kafka..");
    }
  }

module.exports = {sendToKafka, uploadToMongo, uploadToHdfs}
