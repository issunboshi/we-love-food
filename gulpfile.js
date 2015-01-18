// ==========================================================================
// # DEPENDENCIES
// ==========================================================================

var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins')
plugins = gulpLoadPlugins();
plugins.prefix = require('gulp-autoprefixer');
plugins.sass = require("gulp-sass");
plugins.sourcemaps = require("gulp-sourcemaps");
plugins.minifyCSS = require('gulp-minify-css')


// ==========================================================================
// # CONSTANTS
// ==========================================================================

var basePath      = "./";

var cssSrcDir 		= basePath + 'sass';
var cssSrcFiles 	= cssSrcDir + '/**/*.scss';
var cssDestDir		= basePath + 'css';

// ==========================================================================
// # TASKS
// ==========================================================================


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
            .pipe(plugins.minifyCSS())
    		.pipe(gulp.dest(cssDestDir));
});

// ==========================================================================
// # CORE TASKS
// ==========================================================================

// Default task
gulp.task('default', ['css'], function () {
    gulp.watch( cssSrcFiles, ['css']);
});

// Build
gulp.task('build', ['css']);