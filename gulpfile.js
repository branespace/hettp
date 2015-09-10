'use strict';

var gulp = require('gulp'),
    gulpMocha = require('gulp-mocha'),
    gulpJSHint = require('gulp-jshint'),
    files = ['*/**.js', '!./node_modules/**'];

gulp.task('default', ['jshint', 'mocha']);

gulp.task('jshint', function(){
    return gulp.src(files)
	       .pipe(gulpJSHint())
	       .pipe(gulpJSHint.reporter('default'));
});

gulp.task('mocha', function(){
    return gulp.src(files)
	       .pipe(gulpMocha());
});
