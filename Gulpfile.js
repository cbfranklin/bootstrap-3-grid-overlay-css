var gulp = require('gulp');
var sass = require('gulp-sass');
var cssWrap = require('gulp-css-wrap');
var postcss = require('gulp-postcss');
var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');

gulp.task('css', function () {
    var plugins = [
        autoprefixer({browsers: ['last 1 version']}),
        cssnano()
    ];
    return gulp.src('./src/*.css')

        .pipe(gulp.dest('./dest'));
});

gulp.task('styles', function() {
    var plugins = [
        autoprefixer({browsers: ['> 5% in US', 'ie 9']})
    ];
    var pluginsChrome = [
        cssnano(),
        autoprefixer({browsers: ['last 1 version']})
    ];

    gulp.src('scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(plugins))
        .pipe(gulp.dest('./css'))
        // for chrome extension, wrap all seletors in class "bootstrap-3-grid-overlay"
        .pipe(cssWrap({selector:'.bootstrap-3-grid-overlay'}))
        .pipe(postcss(pluginsChrome))
        .pipe(gulp.dest('./ext/src/inject'));
});

gulp.task('watch',function() {
    gulp.watch('scss/*.scss', ['styles']);
});

gulp.task('default', ['styles','watch']);
