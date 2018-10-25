var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { info: '' });
});
router.post('/', function(req, res, next) {
    var url = "mongodb://localhost:27017/";

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Student");
  var myobj = { FirstName: req.body.FirstName,LastName: req.body.LastName,Dob: req.body.Dob,Gender: req.body.Gender,Email: req.body.Email,PhoneNo: req.body.PhoneNo, Address: req.body.Address };
  dbo.collection("StudentDetails").insertOne(myobj, function(err, res) {
    if (err) throw err;
    db.close();
  });
});


  res.render('index', { info: 'inserted' });
});
module.exports = router;
