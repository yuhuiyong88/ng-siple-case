var gulp=require("gulp");
var sass=require("gulp-sass");
var server=require("gulp-webserver");
var webpack = require('webpack');
var config = require('./webpack.config.js');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    clean  = require('gulp-clean');;

//sass
gulp.task("sass",function(){
    return gulp.src("./src/css/*.sass")
    .pipe(sass())
    .pipe(gulp.dest("./dist/css/"))
})

//server
gulp.task("serve",["sass"],function(){
    return gulp.src("./")
        .pipe(server({
            open:"src/html/index.html",
            directoryListing:true,
            livereload:true
        }))
})

gulp.task('watch',function(){
    gulp.watch('src/css/*.sass',['sass']);
    gulp.watch('./src/html/*.html');
    gulp.watch('src/js/*.js',['webpack']);
    gulp.watch('./src/component/*.js',['webpack']);
})

gulp.task('webpack',function(callback){
    webpack(config).run(function(err, stats) {
        callback();
    });
})

//自动给css加前缀
gulp.task('autoprefixer', function () {
    return gulp.src('./dist/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./test/css/'));
});

gulp.task("default",["serve","watch"])


//生成测试文件

//压缩css
gulp.task('minifycss',function() {
    gulp.src('./dist/css/*.css')      //压缩的文件
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(minifycss())   //执行压缩
        .pipe(gulp.dest('./public/css'));   //输出文件夹
});

//压缩js

gulp.task('minifyjs',function() {
    gulp.src('./dist/js/*.js')
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('./public/js'));  //输出
});

//执行压缩前，先删除文件夹里的内容
gulp.task('clean', function(cb) {
    gulp.src(['./public/js/*.js','./public/js/*.css'])
        .pipe(clean());
});

//默认命令，在cmd中输入gulp bulid后，执行的就是这个命令
gulp.task('bulid', ['clean'], function(){
    gulp.start('minifyjs', 'minifycss');
});


































































