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
		del = require('del'),
        gulpNgConfig = require('gulp-ng-config'),
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
gulp.task('default',['clean','config'], function() {
    gulp.start('run');
});

gulp.task('run',['images','views'], function() {
    gulp.start('sass', 'javascript');
});

gulp.task('dev', function() {
    config.productionEnvironment = false;
    gulp.start('default');
});

gulp.task('watch', function() {
    config.productionEnvironment = false;
    gulp.start('default');
    gulp.watch([config.sourceDir + 'config/config.json'],['config']);
    gulp.watch([config.sourceDir + 'views/**/**.*'],['views']);
    gulp.watch([config.sourceDir + 'scss/**/*.scss', config.bower_components + '/**/*.scss'],['sass']);
    gulp.watch([config.sourceDir + 'javascript/**/*.js', config.bower_components + '/**/*.js'],['javascript']);
});

gulp.task('clean', function(cb) {
	del([
        config.assetsDir,
        config.sourceDir + "javascript/config/*"
        ], cb);
});

gulp.task('config', function(cb) {
    var envString = config.productionEnvironment ? 'production' : 'development';
    gulp.src(config.sourceDir + 'config/config.json')
        .pipe(gulpNgConfig('chatApp.config', {environment: envString}))
        .pipe(gulp.dest(config.sourceDir + 'javascript/config'));

        return cb();
});

gulp.task('images', function() { 
    return gulp.src(config.sourceDir + '/images/**.*') 
        .pipe(gulp.dest(config.assetsDir + '/images')); 
});

gulp.task('views', function() { 
    return gulp.src(config.sourceDir + '/views/**.*') 
        .pipe(gulp.dest(config.assetsDir + '/views')); 
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

gulp.task('javascript', function() {
    gulp.src([
        config.bowerDir + "angularjs/angular.js",
        config.bowerDir + "angular-route/angular-route.js",
        config.bowerDir + "firebase/firebase.js",
        config.bowerDir + "angularfire/dist/angularfire.js",
        config.bowerDir + "angular-window-events/window_event_broadcasts.js",
        config.bowerDir + "angular-scroll-glue/src/scrollglue.js",
        config.bowerDir + "moment/moment.js",
        config.bowerDir + "angular-moment/angular-moment.js",
        config.bowerDir + "favico.js/favico.js",
        config.sourceDir + "javascript/app.js",
        config.sourceDir + "javascript/*/*.js"
    ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(gulpif(config.productionEnvironment, uglify({ mangle: false }), sourcemaps.write('../maps')))
    .pipe(gulp.dest(config.assetsDir + 'javascript/'))
});

