// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const util = require("util");
const generate = require('./utils/generateMarkdown');

const writeFileAsync = util.promisify(fs.writeFile);
// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        message: 'What is your GiutHub user name?',
        name: 'username'
    },
    {
        type: 'input',
        message: 'What is your email address',
        name: 'email'
    },
    {
        type: 'input',
        message: 'What is the title of your project?',
        name: 'title'
    },
    {
        type: 'input',
        message: 'Please write a description of your project',
        name: 'description'
    },
    {
        type: 'list',
        message: 'What License should your project have?',
        name: 'license',
        choices: [
            "MIT",
            "Unlicense",
            "Apache 2.0",
            "GNU v3",
            "BSD 3-Clause",
            "Mozilla Public License 2.0"
        ]
    },
    {
        type: 'input',
        message: 'What command should be run to install dependencies',
        name: 'installation',
        default: 'npm i'
    },
    {
        type: 'input',
        message: 'What command should be run to run tests?',
        name: 'tests',
        default: 'npm run test'
    },
    {
        type: 'input',
        message: 'What does the user need to know about using the repository?',
        name: 'usage'
    },
    {
        type: 'input',
        message: 'What does the user need to know about contributing to your repository?',
        name: 'contribute'
    }
]

const promptUser = () => {
    return inquirer
        .prompt(questions)
};

// TODO: Create a function to write README file
const writeToFile = (fileName, data) => {
    return writeFileAsync(fileName, data);
}

// TODO: Create a function to initialize app
const init = async () => {
    try {
        console.log('Welcome to README generator please answer the following questions:')
        
        const answers = await promptUser();

        const fileContent = generate(answers);

        await writeToFile("./README.md", fileContent);

        console.log("README.md file created!")
        
    } catch (err) {
        console.error('Error creating README. File not created.');
        console.log(err);
    }
}

// Function call to initialize app
init();
