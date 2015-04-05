/* Config: */
var config = {
	publicDir: "public/",
	sourceDir: "src/",
	bowerDir: "bower_components/",
	assetsDir: "public/assets/",
	productionEnvironment: true
}

/* Gulp requirements */
var     gulp = require('gulp'),
        gutil = require('gulp-util'),
        clean = require('gulp-clean'),
        uglify = require('gulp-uglify'),
        plumber = require('gulp-plumber'),
        concat = require('gulp-concat'),
        sourcemaps = require ('gulp-sourcemaps'),
        gulpif = require('gulp-if'),
        plumber = require('gulp-plumber')
        sass = require('gulp-sass'),
        csso = require('gulp-csso'),
        autoprefixer = require('gulp-autoprefixer');        

/* Executable tasks */
gulp.task('default',['clean'], function() {
    gulp.start('run');
});

gulp.task('run',['icons','images'], function() {
    gulp.start('sass');
});

gulp.task('dev', function() {
    config.productionEnvironment = false;
    gulp.start('default');
});

gulp.task('watch', function() {
    config.productionEnvironment = false;
    gulp.start('default');
    gulp.watch([config.sourceDir + 'scss/**/*.scss', './bower_components/**/*.scss'],['sass']);
});

gulp.task('clean', function() {
	return gulp.src(config.assetsDir, {read:false})
		.pipe(clean());
});

gulp.task('images', function() { 
    return gulp.src(config.sourceDir + '/images/**.*') 
        .pipe(gulp.dest(config.assetsDir + '/images')); 
});

gulp.task('icons', function() { 
    return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*') 
        .pipe(gulp.dest(config.assetsDir + '/fonts')); 
});

/* Stylesheet compilation */
gulp.task('sass', function () {
    gulp.src(config.sourceDir + 'scss/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
        	includePaths: [
        		config.bowerDir + 'bootstrap-sass-official/assets/stylesheets/',
        		config.bowerDir + 'fontawesome/scss'
        	]}
        ))
        .pipe(autoprefixer({
            browsers: ['> 5% in NL'],
            cascade: true,
            remove: true
        }))
        .pipe(gulpif(config.productionEnvironment, csso(), sourcemaps.write('../maps')))
        .pipe(gulp.dest(config.assetsDir + 'css/'))
});