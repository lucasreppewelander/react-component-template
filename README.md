# React Modules Template
> Easy create new react modules with this tool

## Installation
```
npm install -g react-modules-template
```

## Usage
```
react-module Login
```

This will generate a Folder named Login relative to your current path
and three files: an empty Login.scss and another file named Login.jsx filled with
starter code for exporting a module with custom css.

### Configuration
```
react-module --init
```

This will step you through some configuration questions to make this package create files according to your project, in this init you can specify javascript extension, css extension and wheter or not to use ES6 classes.

## Changelog

#### v1.2.0
Added a jest .js test file, the starter code only checks that it can be rendered, but it can be fille with more!

#### v2.0.0
Added functionality for a configuration file, added the --init flag when running to create the config file.
Made it easier to customise to your own coding style and file structure.

## Output
```
./Login
    --- Login.jsx
    --- Login.test.js
    --- Login.scss
```