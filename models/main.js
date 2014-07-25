var Person = require('./person');

var Models = {};

Models.Person = Person;

// var me = {firstname: "Alli", lastname: "Cernoch"};

// Models.Person.create(me, function (err, person) {
//   console.log("Put myself into the database");
// });

Models.Person.findBy('firstname', 'Alli', function (err, person) {
  console.log("Checking for Alli in the database");
})

// Models.Person.all(function(err, people){
//   console.log(people);
// });

// Models.Person.findBy("id", 1, function(err, person){
//   console.log("found", person);
//   person.update({firstname: "sam", lastname: "creek"}, function(err, person){
//     console.log("UPDATED:", person)
//   });
// })

module.exports = Models;