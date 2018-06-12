"use strict";

var gulp = require('gulp');
var intercept = require('gulp-intercept');
var mergeStream = require('merge-stream');

gulp.task("npm", ()=>{

    var indexStr = gulp.src("Build/Production/index.js")
        .pipe(gulp.dest("Artifacts/Npm"));

    var packageStr = gulp.src("package.json")
        .pipe(intercept(file=>{
            var pkg = JSON.parse(file.contents.toString());
            delete pkg.devDependencies;
            delete pkg.scripts;
            var newContent = JSON.stringify(pkg, null, "\t");
            file.contents = Buffer.from(newContent);
            return file;
        }))
        .pipe(gulp.dest("Artifacts/Npm"));

    return mergeStream(indexStr, packageStr);
});

gulp.task("default", ["npm"]);