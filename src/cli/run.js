#!/usr/bin/env node
'use strict';
var program = require('commander');
var colors = require('colors/safe');
colors.setTheme({
    info: ['bold', 'green'],
    list: ['bold', 'blue']
});

program.on('--help', function() {
    console.log(colors.info('Usage'));
    console.log();
    console.log(colors.blue('$ bee-tools run lint'), 'lint test');
    console.log(colors.blue('$ bee-tools run test'), 'run test');
    console.log(colors.blue('$ bee-tools run coverage'), 'test coverage');
    console.log(colors.blue('$ bee-tools run chrome'), 'run test in chrome');
    console.log(colors.blue('$ bee-tools run browsers'), 'run test in browsers which you have');
});

program.parse(process.argv);

var task = program.args[0];

if (!task) {
    program.help()
} else {
    var gulp = require('gulp');
    require('../gulpfile');
    gulp.start(task);
}
