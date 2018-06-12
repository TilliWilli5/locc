"use strict";

var gulp = require('gulp');
var replace = require('gulp-replace');

// var packageVersion = require("./package.json").version;


gulp.task("npm", ()=>{
    /* var stream =  */gulp.src("Build/Production/index.js")
        .pipe(gulp.dest("Artifacts/Npm"));

    gulp.src("package.json")
        // .pipe((...args)=>{
        //     console.log(args);
        // })
        // .pipe(replace())
        .pipe(gulp.dest("Artifacts/Npm"));

    // return stream;
});

gulp.task("default", ["npm"]);