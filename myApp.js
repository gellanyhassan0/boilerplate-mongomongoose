require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

var Person = mongoose.model("Person", personSchema);


var createAndSavePerson = function(done) {
  const document = new Person({
    name: "Adam",
    age: 3,
    favoriteFoods: [
      "Apple"
    ]
  });
  document.save(function(err, data) {
    if (err) {
      done(err);
      return;
    }
    done(null, data);
  });
};


var createManyPeople = function(arrayOfPeople, done) {
    Person.create(arrayOfPeople, function(err, data) {
      if (err) {
        done(err);
        return;
      }
      done(null, data)
    });
};


var findPeopleByName = function(personName, done) {
  Person.find(
    { name: personName },
    done
  );
};




var findOneByFood = function(food, done) {
  Person.findOne(
    { favoriteFoods: { $all: [food] } },
    done
  );
};


var findPersonById = function(personId, done) {
  Person.findById(personId, done);
};


var findEditThenSave = function(personId, done) {
  var foodToAdd = 'hamburger';
  Person.findById(personId, function(err, person) {
    if (err) {
      done(err);
      return;
    }
    person.favoriteFoods.push(foodToAdd);
    person.save(done);
  });
};



var findAndUpdate = function(personName, done) {
  var ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true }
  ).then(
    person => done(null, person),
    done
  );
};


var removeById = function(personId, done) {
  Person.findByIdAndRemove(personId).then(
    res => done(null, res),
    done
  );
};


var removeManyPeople = function(done) {
  var nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }).then(
    res => done(null, res),
    done
  );
};



var queryChain = function(done) {
  var foodToSearch = "burrito";
  Person.find({ favoriteFoods: { $all: [foodToSearch] } })
    .sort({ name: "asc" })
    .limit(2)
    .select({ age: 0 })
    .exec()
    .then(res => done(null, res))
    .catch(done);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
