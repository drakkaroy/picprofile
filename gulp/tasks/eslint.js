'use strict';

var gulp = require("gulp");
var config = require("../config");
var eslint = require("gulp-eslint");
var notify = require("gulp-notify");
var plumber = require("gulp-plumber");


gulp.task('eslint', function() {
    gulp.src([config.js.all, '!app/assets/scripts/vendor/**'])
        .pipe(eslint())
        .pipe(plumber())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .on('error', notify.onError({ message: 'There is a JS error, please look the console for details'}));
});