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
	concat = require("gulp-concat"),
	del = require("del"),
	watch = require("gulp-watch"),
	browserSync = require("browser-sync").create(),
	proxyMiddleware = require("http-proxy-middleware"),
	babel = require("gulp-babel"),
	jsPath = "src/js/*.js",
	cssPath = "src/static/css/**/*.css",
	htmlPath = "src/views/*.html";

gulp.task("concat", function (done) {
	gulp.src(jsPath)
		.pipe(concat("all.js"))
		.pipe(gulp.dest("./dist/"))
	done()
})
gulp.task("html", function (done) {
	gulp.src(htmlPath)
		.pipe(gulp.dest("./dist/"))
	done();
})

gulp.task("test", gulp.series(["concat", "html"], function () {
	browserSync.init({
		server: {
			baseDir: "dist/",
		},
		post: 8050
	});
	watch([jsPath, htmlPath], function () {
		gulp.series(["concat", "html"]);
		browserSync.reload;
	});
}))

gulp.task("clean", function () {
	del([
		"dist"
	]).then()
});