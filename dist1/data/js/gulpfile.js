const gulp = require("gulp");
const connect = require("gulp-connect");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const cleancss = require("gulp-clean-css");
const babel = require("gulp-babel");

gulp.task("copyHtml",function(){
	gulp.src("*.html")
	.pipe(gulp.dest("dist"))
	.pipe(connect.reload());;
});
gulp.task("copyImg",function(){
	gulp.src("img/**").pipe(gulp.dest("dist/img"));
});
gulp.task("copyJs",function(){
	gulp.src(["js/*.js"])
	.pipe(gulp.dest("dist/data/js"))
	.pipe(connect.reload());
})
gulp.task("copyFonts",function(){
	gulp.src(["fonts/**"])
	.pipe(gulp.dest("dist/fonts"))
	.pipe(connect.reload());
})

gulp.task("sass",function(){
	gulp.src("sass/*.scss")
	.pipe(sourcemaps.init())//将css的样式和scss关联起来，调试时，f12可以直接显示scss的行数；
	.pipe(sass())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('dist/css'))
})

gulp.task("cleancss",function(){
	gulp.src("sass/*.scss")
	.pipe(cleancss())
	.pipe(gulp.dest("dist/css"))
	
})


// gulp.task("uglify",function(){
//	gulp.src("sass/*.scss")
//	.pipe(gulp.dest("dist/css"))
//	.pipe(uglify())
//	.pipe(rename({suffix:".min"}))
//	.pipe(gulp.dest("dist/css"))
//})

gulp.task("build",["copyHtml","copyImg","copyJs","sass","copyFonts"]);

//文件修改后自动更新
gulp.task("server",function(){
	connect.server({
		root:"dist",
		livereload:true
	});
})

gulp.task("watch",function(){
	gulp.watch("*.html",["copyHtml"]);
	gulp.watch("img/**",["copyImg"]);
	gulp.watch(["js/*.js"],["copyJs"]);
	gulp.watch("sass/*.scss",["sass"]);
	gulp.watch("fonts/**",["copyFonts"]);
	
	
	
	
})
gulp.task("default",["server","watch"]);

