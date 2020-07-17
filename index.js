const inquirer = require("inquirer");
const weather = require("weather-js");
const moment = require("moment");
const fs = require("fs");

inquirer.prompt([
    {
        type: "input",
        message: "What is your name?",
        name: "name"
    },
    {
        type: "input",
        message: "What location do you want weather for?",
        name: "location"
    },
    {
        type: "list",
        message: "Would you like the degrees in fahrenheit or celsius?",
        name: "degreeType",
        choices: ["fahrenheit", "celsius"]
    }
]).then(({ name, location, degreeType }) => {
    console.log(location);

    weather.find({ search: location, degreeType: degreeType === "fahrenheit" ? "F" : "C" }, (err, result) => {
        if (err) console.log(err);

        console.log(JSON.stringify(result, null, 2));

        const userEntry = `Name: ${name} | Location: ${location} | Date: ${moment().format("dddd, MMMM Do YYYY, h:mm:ss a")}\n`;
    
        fs.appendFile("log.txt", userEntry, (err) => {
            if (err) return console.log(err);

            console.log(`Successfully logged ${name}'s info to 'log.txt'!`);     
        });
    });
}); 