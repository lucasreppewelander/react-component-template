#!/usr/bin/env node
'use strict';

const fs          = require('fs');
const touch       = require('touch');
const path        = require('path');
const parseArgs   = require('minimist');
const async       = require('async');
const _           = require('lodash');
const inquirer    = require('inquirer');

const config      = '.react_module';
const setup       = require('./lib/setup.jsx');
let customPaths = {
    path: '',
}

const argv = parseArgs(process.argv.slice(2));

const checkDirectory = (dir, paths, cb) => {
    fs.stat(dir, function(err, stats) {
        if (err && err.errno === -2) {
          fs.mkdir(path.join(process.cwd(), paths, dir), cb);
        } else {
          cb(err);
        }
      });
}

const createComponent = (name, paths, cb) => {
    const files = [
        `${name}.jsx`,
        `${name}.scss`,
        `${name}.test.js`
    ];

    const directory = name;
    checkDirectory(directory, paths, err => {
        if (err) return console.log(err);
        async.each(files, (file, _cb) => {
            touch(path.join(process.cwd(), paths, directory, file), e => _cb(e))
        }, error => cb(error, files));
    })
}

const configCheck = (error, contents) => {
    if (error && error.errno !== -2) return console.log(error);
    if (error && error.errno === -2) return customPaths;

    return JSON.parse(contents);
}

if (argv.init) {
    inquirer.prompt(setup.questions).then(answer => {
        fs.readFile(path.join(__dirname, 'lib/files/config.jsx'), 'utf8', (err, contents) => {
            if (err) return console.error(err);

            let es6 = false;

            if (answer.es6 === 'yes') es6 = true;

            contents = contents.replace(/__tpl_cfg_path__/g, answer.path);
            contents = contents.replace(/__tpl_cfg_es6__/g, es6);
            contents = contents.replace(/__tpl_cfg_css__/g, answer.extension);
            contents = contents.replace(/__tpl_cfg_extension__/g, answer.css);

            touch(path.join(process.cwd(), '.react_module'), e => {
                if (e) return console.error(e);

                fs.appendFile(path.join(process.cwd(), '.react_module'), contents, (error) => {
                    if (error) console.log('error in appending config file', error);
                    console.log('Successful init');
                })
            })
        });
    });
} else {
    fs.readFile(path.join(process.cwd(), config), 'utf8', (error, contents) => {
        const cfg = configCheck(error, contents);

        createComponent(argv._[0], cfg.path, (err, files) => {
            if (err) return console.log(err);
            async.each(files, (file, cb) => {
                if (_.includes(file, '.scss')) return cb(null);
                if (_.includes(file, '.test.js')) {
                    fs.readFile(path.join(__dirname, 'lib/files/test.jsx'), 'utf8', (e, contents) => {
                        if (e) return cb(err);
                        contents = contents.replace(/__tpl_name__/g, argv._[0]);
                        fs.appendFile(path.join(process.cwd(), cfg.path, `${argv._[0]}/${argv._[0]}.test.js`), contents, cb);
                    })
                } else {
                    fs.readFile(path.join(__dirname, 'lib/files/component.jsx'), 'utf8', (e, contents) => {
                        if (e) return cb(err);
                        contents = contents.replace(/__tpl_name__/g, argv._[0]);
                        fs.appendFile(path.join(process.cwd(), cfg.path, `${argv._[0]}/${argv._[0]}.jsx`), contents, cb);
                    })
                }
            }, (err) => {
                if (err) return console.log(err);
                console.log(`Successfully created files at ${cfg.path}/${argv._[0]}`);
            })
        });
    });
}
