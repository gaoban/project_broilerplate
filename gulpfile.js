var compass = require('gulp-compass'),
	jade = require('gulp-jade'),
	livereload = require('gulp-livereload'),
	gulp = require('gulp'),
	compass = require('gulp-compass'),
	gutil = require('gulp-util'),
	embedlr = require('gulp-embedlr');



var build = "dev";

/*this setting is not needed for some reason*/
// gulp.task('server', function(next){
// 	var connect = require('connect'), server = connect();
// 	server.use(connect.static()).listen(process.env.PORT || 80, next);
// });

gulp.task('template', function(){
	gulp.src('./src/jade/*.jade')
		.pipe(jade({pretty:true}))
		.pipe((build==="dev")? embedlr(): gutil.noop())
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
	var server = livereload();
	gulp.watch('./src/jade/**/*.jade', ['template']);
	gulp.watch('./src/sass/**/*.scss', ['compass']);
	gulp.watch(['./css/*.css', './*.html']).on('change', function(file){
		server.changed(file.path);
	});
});

gulp.task('default', ['watch']);