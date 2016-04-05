'use strict';

var gulp = require("gulp");
var config = require("../config");
var gutil = require("gulp-util");
var path = require("path");
//var babelify = require("babelify");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var buffer = require("gulp-buffer");
var exorcist = require("exorcist");


gulp.task('jsbundle', ['eslint'], function() {
    browserify({
        paths: [ path.join(__dirname, config.app) ],
        entries: config.js.entryFile,
        debug: true
    })
        //.transform(babelify)
        .bundle().on('error', function(error){
            gutil.log(gutil.colors.red('[Build Error]', error.message));
            this.emit('end');
        })
        .pipe(exorcist(config.js.sourcemapFile))
        .pipe(source(config.js.outputFile))
        .pipe(buffer())
        .pipe(gulp.dest(config.js.appOutputPath));
});


gulp.task('jsbundle:dist', function() {
    browserify({
        paths: [ path.join(__dirname, config.app) ],
        entries: config.js.entryFile,
        debug: true
    })
        //.transform(babelify)
        .bundle().on('error', function(error){
            gutil.log(gutil.colors.red('[Build Error]', error.message));
            this.emit('end');
        })
        .pipe(source(config.js.outputFile))
        .pipe(buffer())
        .pipe(gulp.dest(config.js.distOutputPath));
});