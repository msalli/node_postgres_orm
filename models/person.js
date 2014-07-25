var db = require('./db');

function Person(params) {
  this.firstname = params.firstname;
  this.lastname = params.lastname;
  this.id = params.id;
};


Person.all = function(callback){
  db.query("SELECT * FROM people",[], function(err, res){
    var allPeople = [];
    // do something here with res
    callback(err, allPeople);
  });
}

Person.findBy = function(key, val, callback) {
  db.query("",[val], function(err, res){
    var foundRow, foundPerson;
    // do something here with res
    callback(err, foundPerson);
  });
};


//takes params and a callback
//need to fill out random string to INSERT people
//try adding some people in PSQL, then copy that command here
//first element in the array goes to $1, second element goes to $2
//the $ does some stuff in the background to protect from hackers
Person.create = function(params, callback){
  db.query("INSERT INTO people (firstname, lastname) VALUES ($1, $2)", 
    [params.firstname, params.lastname], function(err, res){
    var createdRow, newPerson;
    callback(err, newPerson);
  });
};

Person.prototype.update = function(params, callback) {
  var colNames = [];
  var colVals = [];
  var count = 2;

  for(var key in this) {
    if(this.hasOwnProperty(key) && params[key] !== undefined){
      var colName = key + "=$" + count;
      colNames.push(colName);
      colVals.push(params[key]);
      count++;
    }
  }

  var statement = "UPDATE people SET " + colNames.join(", ") + " WHERE id=$1 RETURNING *";
  var values = [this.id].concat(colVals);
  console.log("Running:");
  console.log(statement, "with values", values);
  var _this = this;
  db.query(statement, values, function(err, res) {
    var updatedRow;
    if(err) {
      console.error("OOP! Something went wrong!", err);
    } else {
      updatedRow = res.rows[0];
      _this.firstname = updatedRow.firstname;
      _this.lastname = updatedRow.lastname;
    }
    callback(err, _this)
  });
}

Person.prototype.destroy = function(){
  db.query("", [this.id], function(err, res) {
    callback(err)
  });
}

module.exports = Person;
