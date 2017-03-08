var file = require('html-wiring');
var path = require('path');
var pkg = JSON.parse(file.readFileAsString('package.json'));
var eslintCfg = JSON.parse(file.readFileAsString(__dirname + '/eslintrc.json'));
var Promise = require('promise');

var utils = {
    runCmd: function(cmd, args, fn) {
        args = args || [];
        var runner = require('child_process').spawn(cmd, args, {
            // keep color
            stdio: 'inherit',
        });
        runner.on('close', (code) => {
            if (fn) {
                fn(code);
            }
        });
    },
    getFromCwd: function() {
        var args = [].slice.call(arguments, 0);
        args.unshift(process.cwd());
        return path.join.apply(path, args);
    },
    getPkg: function() {
        return pkg;
    },
    getEslintCfg: function() {
        return eslintCfg;
    },
    getPackages: function() {
        var commands = [];
        for (var item in pkg.devDependencies) {
            if (item !== 'bee-tools') {
                commands.push(item + '@' + pkg.devDependencies[item]);
            }
        }
        commands.push('--production');
        return commands;
    }
}

module.exports = utils;
