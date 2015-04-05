/* Variables: */
var     documentRoot = "public/";
var 	sourceRoot = "src/";
var     assetsDirectory = documentRoot + "assets/";
var     productionDefualtEnviorment = true;

/* Gulp requirements */
var     gulp = require('gulp'),
        gutil = require('gulp-util'),
        uglify = require('gulp-uglify'),
        plumber = require('gulp-plumber'),
        concat = require('gulp-concat'),
        sourcemaps = require ('gulp-sourcemaps'),
        gulpif = require('gulp-if'),
        livereload = require('gulp-livereload'),
        plumber = require('gulp-plumber')
        sass = require('gulp-sass'),
        csso = require('gulp-csso'),
        autoprefixer = require('gulp-autoprefixer');        

/* Executable tasks */
gulp.task('default', function() {
    gulp.start('sass');
});

gulp.task('dev', function() {
    productionDefualtEnviorment = false;
    gulp.start('default');
});

gulp.task('watch', function() {
    productionDefualtEnviorment = false;
    gulp.start('default');
    livereload.listen();
    gulp.watch([sourceRoot + 'scss/**/*.scss', './bower_components/**/*.scss'],['sass']);
});

/* Stylesheet compilation */
gulp.task('sass', function () {
    gulp.src(sourceRoot + 'scss/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['> 5% in NL'],
            cascade: true,
            remove: true
        }))
        .pipe(gulpif(productionDefualtEnviorment, csso(), sourcemaps.write('../maps')))
        .pipe(gulp.dest(assetsDirectory + 'css/'))
        .pipe(livereload());
});