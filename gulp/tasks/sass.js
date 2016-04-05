'use strict';

var gulp = require("gulp");
var config = require("../config");
var autoprefixer = require("gulp-autoprefixer");
var plumber = require("gulp-plumber");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");

gulp.task('sass',function(){

    gulp.src(config.css.all)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass.sync({
            outputStyle: 'expanded',
            precision: 10,
            includePaths: ['.']
        }).on('error', sass.logError))
        .pipe(autoprefixer({browsers: ['last 2 versions', 'ie 9']}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.css.appDest))

});

gulp.task('sass:dist', ['assemble:dist'], function(){

    gulp.src('app/assets/styles/**/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass.sync({
            outputStyle: 'expanded',
            precision: 10,
            includePaths: ['.']
        }).on('error', sass.logError))
        .pipe(autoprefixer({browsers: ['last 2 versions', 'ie 9']}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.css.distDest))
});