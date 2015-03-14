// ==========================================================================
// # DEPENDENCIES
// ==========================================================================

var gulp = require('gulp'),
gulpLoadPlugins = require('gulp-load-plugins');

plugins = gulpLoadPlugins();

plugins.prefix = require('gulp-autoprefixer');
plugins.sass = require("gulp-sass");
plugins.sourcemaps = require("gulp-sourcemaps");
plugins.minifyCSS = require('gulp-minify-css');
plugins.jshint = require('gulp-jshint');
pluginsstylish = require('jshint-stylish');
plugins.uglify = require('gulp-uglify');
plugins.concat = require('gulp-concat');
plugins.mocha = require('gulp-mocha');
plugins.argv = require('yargs').argv;

// ==========================================================================
// # CONSTANTS
// ==========================================================================

var basePath      = "./";

var cssSrcDir 		= basePath + 'sass';
var cssSrcFiles 	= cssSrcDir + '/**/*.scss';
var cssDestDir		= basePath + 'css';

var jsSrcDir      = basePath + 'js/src';
var jsSrcFiles    = [ jsSrcDir + '/*.js'];
var jsDestDir     = basePath + 'js/dist';
var jsDestFiles    = [ jsDestDir + '/*.js'];

// ==========================================================================
// # TASKS
// ==========================================================================

/* #TESTS
   ===========================================================================*/

gulp.task('test', function () {
    var testSrc = plugins.argv.tests ? './test/' + plugins.argv.tests : './test/**/test-*.js';
    process.env.TEST_ROOT_URL = 'http://cliff.welovefood.com';
    return gulp.src(testSrc, {read: false})
    .pipe(plugins.mocha({
        reporter: 'spec',
        globals:  ['TEST*']
     }));
});

// # JSHINT
// ==========================================================================

gulp.task('jshint', function() {
  return gulp.src( [
      jsSrcDir + '/app.js'
    ] )
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter(plugins.stylish));
});

gulp.task('javascript', function() {
  gulp.src(jsSrcFiles)
    .pipe(plugins.concat('app.js'))
    .pipe(gulp.dest('js/dist/'))
    .pipe(plugins.uglify())
    .pipe(plugins.concat('app.min.js'))
    .pipe(gulp.dest('js/dist/'))
});

/* # CSS
   ========================================================================== */

gulp.task('css', function() {
    gulp.src(cssSrcFiles)
    	.pipe(plugins.sourcemaps.init())
    	.pipe(plugins.sass({
    		errLogToConsole: true
    	}))
    	.pipe(plugins.sourcemaps.write())
            .pipe(plugins.prefix())
            // .pipe(plugins.minifyCSS())
            .pipe(gulp.dest(cssDestDir));
});

// ==========================================================================
// # CORE TASKS
// ==========================================================================

// Default task
gulp.task('default', ['css'], function () {
    gulp.watch( cssSrcFiles, ['css']);
    gulp.watch( jsSrcFiles, ['jshint', 'javascript']);
    gulp.watch( [jsDestFiles, './test/**/*.js', './test/*.js'], ['test']);
});

// Build
gulp.task('build', ['css']);