
// dependency
var fs = require('fs');
var util = require('./util');
var path = require('path');
var shelljs = require('shelljs');

// gulp & gulp plugin
var gulp = require('gulp');
var eslint = require('gulp-eslint');


gulp.task('lint', function(cb) {
    var eslintCfg = util.getEslintCfg();
    gulp.src([
            path.join(process.cwd(), './src/**/*.js'),
            path.join(process.cwd(), './demo/**/*.js')
        ])
        .pipe(eslint(eslintCfg))
        .pipe(eslint.format('table'))
        .pipe(eslint.failAfterError());
});


gulp.task('test', function(done) {
    var karmaBin = require.resolve('karma/bin/karma');
    var karmaConfig = path.join(__dirname, './karma.phantomjs.conf.js');
    var args = [karmaBin, 'start', karmaConfig];
    util.runCmd('node', args, done);
});

gulp.task('coverage', (done) => {
    if (fs.existsSync(util.getFromCwd('coverage'))) {
        shelljs.rm('-rf', util.getFromCwd('coverage'));
    }
    var karmaBin = require.resolve('karma/bin/karma');
    var karmaConfig = path.join(__dirname, './karma.phantomjs.coverage.conf.js');
    var args = [karmaBin, 'start', karmaConfig];
    util.runCmd('node', args, done);
});


gulp.task('browsers', (done) => {
    var karmaBin = require.resolve('karma/bin/karma');
    var karmaConfig = path.join(__dirname, './karma.browsers.conf.js');
    var args = [karmaBin, 'start', karmaConfig];
    util.runCmd('node', args, done);
});

gulp.task('chrome', (done) => {
    var karmaBin = require.resolve('karma/bin/karma');
    var karmaConfig = path.join(__dirname, './karma.chrome.conf.js');
    var args = [karmaBin, 'start', karmaConfig];
    util.runCmd('node', args, done);
});
