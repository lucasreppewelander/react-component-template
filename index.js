#!/usr/bin/env node
'use strict';

var chalk       = require('chalk');
var clear       = require('clear');
var CLI         = require('clui');
var Spinner     = CLI.Spinner;
var fs          = require('fs');
var touch       = require('touch');
var path        = require('path');
var parseArgs   = require('minimist');
var async       = require('async');
var _           = require('lodash');

// var files       = require('./lib/files');

var exec        = require('child_process').exec;


clear();

const argv = parseArgs(process.argv.slice(2));
console.log({ argv });


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
    var files = [
        `${name}.jsx`,
        `${name}.scss`,
    ];

    var directory = name;
    checkDirectory(directory, (err) => {
        if (err) return console.log(err);
        async.each(files, (file, _cb) => {
            touch(path.join(process.cwd(), directory, file), (e) => {
                _cb(e);
            })
        }, (error) => cb(error, files));
    })
}

if (argv._[0] === 'create') {
    createComponent(argv._[1], (err, files) => {
        if (err) return console.log(err);

        console.log({ files });
        
        async.each(files, (file, cb) => {
            if (!_.includes(file, '.jsx')) return cb(null);
            fs.readFile(path.join(__dirname, 'lib/files/component.jsx'), 'utf8', (e, contents) => {
                if (e) return cb(err);
                contents = contents.replace(/__tpl_name__/g, argv._[1]);
                fs.appendFile(path.join(process.cwd(), `${argv._[1]}/${argv._[1]}.jsx`), contents, cb);
            })
        }, (err) => {
            if (err) return console.log(err);
            console.log('success');
        })
    });
}