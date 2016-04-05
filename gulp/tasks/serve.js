'use strict';

var gulp = require("gulp");
var gutil = require("gulp-util");

gulp.task('serve', ['default'], function(){

    gutil.log(gutil.colors.yellow('The task "gulp serve" is deprecated, use "gulp" instead'));

});