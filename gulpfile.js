var compass = require('gulp-compass'),
	jade = require('gulp-jade'),
	livereload = require('gulp-livereload'),
	gulp = require('gulp'),
	compass = require('gulp-compass'),
	gutil = require('gulp-util')


gulp.task('template', function(){
	gulp.src('./src/jade/*.jade')
		.pipe(jade({pretty:true}))
		.pipe(gulp.dest('.'));
});

gulp.task('compass', function(){
	gulp.src('./src/sass/**/*scss')
		.pipe(compass({
			config_file: './config.rb',
			css:'./css',
			sass:'./src/sass'
		}))
		.on('error', gutil.log)
		.pipe(gulp.dest('./css'));
});

gulp.task('watch', function(){
	gulp.watch('./jade/**/*.jade', ['template']);
	gulp.watch('./src/sass/**/*.scss', ['compass']);
});

gulp.task('default', ['watch']);