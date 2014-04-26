var gulp = require('gulp');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var sass = require('gulp-ruby-sass');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var coffee = require('gulp-coffee');
var exec = require('child_process').exec;
var sys = require('sys');

var lessDir = 'less/';
var targetCSSDir = 'public/css/';

gulp.task('css', function() {
    return gulp.src(lessDir + 'grouptopics.less')
        .pipe(less({style: 'compressed'}).on('error', gutil.log))
        .pipe(autoprefixer('last 10 versions'))
        .pipe(gulp.dest(targetCSSDir))
        .pipe(notify('CSS compiled, prefixed, and minified'))
});

gulp.task('phpunit', function() {
    exec('phpunit', function(error, stdout) {
        sys.puts(stdout);
    });
});

gulp.task('watch', function(){
    gulp.watch(lessDir + 'bootstrap.less', ['css']);
    gulp.watch('app/**/*.php', ['phpunit']);
});

gulp.task('default', ['css', 'phpunit', 'watch']);
