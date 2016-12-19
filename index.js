#!/usr/bin/env node
'use strict';

const fs          = require('fs');
const touch       = require('touch');
const path        = require('path');
const parseArgs   = require('minimist');
const async       = require('async');
const _           = require('lodash');

const argv = parseArgs(process.argv.slice(2));
const checkDirectory = (dir, cb) => {
    fs.stat(dir, function(err, stats) {
        if (err && err.errno === -2) {
          fs.mkdir(path.join(process.cwd(), dir), cb);
        } else {
          cb(err);
        }
      });
}

const createComponent = (name, cb) => {
    const files = [
        `${name}.jsx`,
        `${name}.scss`,
    ];

    const directory = name;
    checkDirectory(directory, (err) => {
        if (err) return console.log(err);
        async.each(files, (file, _cb) => {
            touch(path.join(process.cwd(), directory, file), (e) => {
                _cb(e);
            })
        }, (error) => cb(error, files));
    })
}

createComponent(argv._[0], (err, files) => {
    if (err) return console.log(err);
    async.each(files, (file, cb) => {
        if (!_.includes(file, '.jsx')) return cb(null);
        fs.readFile(path.join(__dirname, 'lib/files/component.jsx'), 'utf8', (e, contents) => {
            if (e) return cb(err);
            contents = contents.replace(/__tpl_name__/g, argv._[0]);
            fs.appendFile(path.join(process.cwd(), `${argv._[0]}/${argv._[0]}.jsx`), contents, cb);
        })
    }, (err) => {
        if (err) return console.log(err);
        console.log(`Sucessfully created files at /${argv._[0]}`);
    })
});