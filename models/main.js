var Person = require('./person');

var Models = {};

Models.Person = Person;


// JUST TESTING STUFF
var me = {firstname: "Alli", lastname: "Cernoch"};

// create test
// Models.Person.create(me, function (err, person) {
//   console.log("Put myself into the database " + person.firstname + " " + person.lastname);
// });

// findby test
// Models.Person.findBy('id', 1, function (err, person) {
//   console.log("Checking database: " + person);
// });

// all test
// Models.Person.all(function(err, people){
//   console.log(people);
// });

//delete test
// Models.Person.findBy("id", 46, function (err, person){
//   var id = 46;
// person.destroy(function(err) {
//   console.log("Deleted")
// });
// })



// Models.Person.findBy("id", 1, function(err, person){
//   console.log("found", person);
//   person.update({firstname: "sam", lastname: "creek"}, function(err, person){
//     console.log("UPDATED:", person)
//   });
// })



module.exports = Models;