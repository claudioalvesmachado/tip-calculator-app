'use strict'

const gulp = require('gulp');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

const scss_src = './app/scss/main.scss';
const scss_dist = './dist/css/';
const js_src = './app/js/app.js';
const js_dist = './dist/js/';


function buildStyles() {
    return gulp.src(scss_src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false
      }))
    .pipe(cssnano())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(scss_dist));
}

function compressJs() {
    return gulp.src(js_src)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(js_dist));

}


exports.buildStyles = buildStyles;
exports.compressJs = compressJs;

exports.watch = function () {
    gulp.watch(scss_src, gulp.series('buildStyles'));
    gulp.watch(js_src, gulp.series('compressJs'));
  };