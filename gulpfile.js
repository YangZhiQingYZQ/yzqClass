const gulp = require("gulp"),
	path = require("path"),
	fs = require("fs"),
	tap = require("gulp-tap"),
	filter = require("gulp-filter"),
	rev = require('gulp-rev-append'),
	include = require("gulp-file-include"),
	uglify = require("gulp-uglify"),
	minifyCss = require("gulp-clean-css"),
	minifyHtml = require("gulp-htmlmin"),
	rename = require("gulp-rename"),
	del = require("del"),
	browserSync = require("browser-sync").create(),
	proxyMiddleware = require("http-proxy-middleware"),
	babel = require("gulp-babel"),
	jsPath = "src/static/js/**/*.js",
	cssPath = "src/static/css/**/*.css",
	htmlPath = "src/view/*.html";

//创建打包任务
gulp.task("build", function() {
	const jsFilter = filter(jsPath, {
			restore: true
		}),
		cssFilter = filter(cssPath, {
			restore: true
		}),
		htmlFilter = filter(htmlPath, {
			restore: true
		}),
		options = {
			removeComments: true, //清除HTML注释
			collapseWhitespace: true, //压缩HTML
			collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input checked />
			removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
			removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
			removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
			minifyJS: true, //压缩页面JS
			minifyCSS: true //压缩页面CSS
		};
	return gulp.src(["src/**/*.*"])
		.pipe(jsFilter)
		.pipe(uglify())
		.pipe(jsFilter.restore)
		.pipe(cssFilter)
		.pipe(minifyCss())
		.pipe(cssFilter.restore)
		.pipe(htmlFilter)
		.pipe(include({
			prefix: "@@",
			basepath: "@file"
		}))
		.pipe(rev())
		.pipe(minifyHtml(options))
		.pipe(htmlFilter.restore)
		.pipe(rename(function(file) {
			file.extname
		}))
		.pipe(gulp.dest('dist/')); //输出文件夹
});

gulp.task("server", gulp.series("build", function() {
	browserSync.init({
		server: {
			baseDir: "dist/",
		},
		post: 8050
	});
	gulp.watch([jsPath, cssPath, htmlPath], gulp.series("build")).on("change", browserSync.reload);
}))

gulp.task("clean", function() {
	del([
		"dist"
	]).then()
});

// gulp.task('default', function() {
// 	gulp.start(["build","server"]);
// });
// gulp.task('default', ['build', 'server'])
