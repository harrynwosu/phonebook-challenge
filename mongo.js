const mongoose = require('mongoose');

if (process.argv.length < 3){
    console.log("give at least password as argument");
    process.exit(1);
}

const password = process.argv[2];
const personName = process.argv[3];
const personNumber = process.argv[4];

const url = `mongodb+srv://haroldnwosu:${password}@cluster0.wyculbz.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema);

if (personName) {
    const person = new Person({
        name: personName,
        number: personNumber ?? "",
    })
    
    person.save().then(result => {
        console.log(`added ${personName} number ${personNumber} to phonebook`);
        mongoose.connection.close();
    })
} else {
    Person.find({}).then(result => {
        console.log('phonebook:');
        result.forEach(person => {
            console.log(`${person.name}: ${person.number}`)
        });
        mongoose.connection.close();
    })
}

