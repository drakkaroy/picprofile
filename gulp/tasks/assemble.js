'use strict';

var assemble = require("assemble");
var gulp = require("gulp");
var config = require("../config");
var get = require("get-value");
var _ = require("lodash");
var extname = require("gulp-extname");
var plumber = require("gulp-plumber");
var flatten = require("gulp-flatten");
var helpers = require("handlebars-helpers");

//Initialize assemble
const app = assemble();

//Initialize hbs helpers
helpers();


gulp.task('load', function(cb) {

    //Set main assemble options
    app.layouts('app/layouts/*.hbs');
    app.pages('app/pages/**/*.hbs');
    app.partials('app/components/**/*.hbs');
    app.engine('hbs', require('engine-handlebars'));
    app.data(['app/{pages,components,data}/**/*.json']);

    //Custom helpers
    app.helper('get', function(prop) {
        return get(this.context, prop);
    });

    app.helper('pagename', function(){
        var url = get(this.context, 'view.path');
        var pagenameArr = url.split('/');
        var pagename = _.last(pagenameArr);
        pagename = pagename.split('.')[0];
        return pagename;
    });

    cb();


});


gulp.task('assemble', ['load'], function(){

    app.toStream('pages')
        .pipe(app.renderFile())
        .pipe(extname())
        .pipe(flatten())
        .pipe(plumber())
        .pipe(app.dest(config.tmp))
});


gulp.task('assemble:dist', ['load', 'clean:dist'], function(){

    app.toStream('pages')
        .pipe(app.renderFile())
        .pipe(extname())
        .pipe(flatten())
        .pipe(plumber())
        .pipe(app.dest(config.dist))
});