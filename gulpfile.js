/**
 * Created by agalempaszek on 29.08.2017.
 */

/*
 from within project folder
 npm init
 npm install gulp --save-dev
 folder structure
 app/ (css, fonts, images, js, scss, index.html)
 dist/
 gulpfile.js
 node_modules/
 package.json
 */
var gulp = require('gulp');
/*
 npm install gulp-sass --save-dev
 */
var sass = require('gulp-sass');
/*
 npm install browser-sync --save-dev
 */
var browserSync = require('browser-sync').create();
/*
 npm install gulp-useref --save-dev
 */
var useref = require('gulp-useref');
/*
 npm install gulp-uglify --save-dev
 */
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
/*
 npm install gulp-cssnano
 */
var cssnano = require('gulp-cssnano');
/*
 /*
 npm install gulp-imagemin --save-dev
 */
var imagemin = require('gulp-imagemin');
/*
 npm install gulp-cache --save-dev
 */
var cache = require('gulp-cache');
/*
 npm install del --save-dev
 */
var del = require('del');
/*
 npm install run-sequence --save-dev
 */
var runSequence = require('run-sequence');


gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    })
});

gulp.task('useref', function(){
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        // Minifies only if it's a CSS file
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'))
});

gulp.task('images', function(){
    return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
});

gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
});

gulp.task('clean:dist', function() {
    return del.sync('dist');
});

gulp.task('watch', ['browserSync', 'sass'], function (){
    gulp.watch('app/scss/**/*.scss', ['sass']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('build', function (callback) {
    runSequence('clean:dist',
        ['sass', 'useref', 'images', 'fonts'],
        callback
    )
});


gulp.task('default', function (callback) {
    runSequence(['sass','browserSync', 'watch'],
        callback
    )
});