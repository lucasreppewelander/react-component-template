const cfg = {
    questions: [
        {
            name: 'path',
            type: 'input',
            message: 'Enter where we should place your components. eg: src/components/, Can be left blank!',
        },
        {
            name: 'es6',
            type: 'rawlist',
            message: 'Would you like to use es6 classes or regular functions?',
            choices: ['yes', 'no, use regular functions']
        },
        {
            name: 'css',
            type: 'rawlist',
            message: 'Do you use any pre processing for your css?',
            choices: ['css', 'scss']
        },
        {
            name: 'extension',
            type: 'rawlist',
            message: 'What extension do you use for your javascript files?',
            choices: ['js', 'jsx']
        }
    ]
}

module.exports = cfg;