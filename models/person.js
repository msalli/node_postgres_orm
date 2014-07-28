var db = require('./db');

function Person(params) {
  this.firstname = params.firstname;
  this.lastname = params.lastname;
  this.id = params.id;
};

//return all entries
//DONE!
Person.all = function(callback){
  db.query("SELECT * FROM people",[], function (err, res){
    var allPeople = [];
    // do something here with res
    res.rows.forEach(function (params) {
      //each time we send someone through the function, we want it to be a new INSTANCE
      //of person, hence new Person function
      allPeople.push(new Person(params));
    });
    callback(err, allPeople);
  });
}

//find user
//DONE!
Person.findBy = function(key, val, callback) {
  //library rule, cannot pass in column name (key)
  db.query("SELECT * FROM people WHERE " + key + " = $1", [val], function (err, res){
    var foundRow = res.rows[0];
    var foundPerson = new Person(foundRow);
    // do something here with res
    callback(err, foundPerson);
  });
};


//takes params and a callback
//need to fill out random string to INSERT people
//try adding some people in PSQL, then copy that command here
//first element in the array goes to $1, second element goes to $2
//the $ does some stuff in the background to protect from hackers

//add new person
//DONE!
Person.create = function(params, callback){
  db.query("INSERT INTO people (firstname, lastname) VALUES ($1, $2) RETURNING *", [params.firstname, params.lastname], function (err, res){
    var newPerson;
    var createdRow = res.rows[0]; 
      res.rows.forEach(function (row) {
      newPerson = new Person(row);
      // console.log(newPerson.firstname, newPerson.lastname);
    });
    callback(err, newPerson);
  });
};

//done for us
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

//done!
Person.prototype.destroy = function(callback) {
  db.query("DELETE FROM people WHERE id = $1", [this.id], function (err, res) {
    callback(err)
  })
}

module.exports = Person;
