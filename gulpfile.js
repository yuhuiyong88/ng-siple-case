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

//�Զ���css��ǰ׺
gulp.task('autoprefixer', function () {
    return gulp.src('./dist/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./test/css/'));
});

gulp.task("default",["serve","watch"])


//���ɲ����ļ�

//ѹ��css
gulp.task('minifycss',function() {
    gulp.src('./dist/css/*.css')      //ѹ�����ļ�
        .pipe(rename({suffix: '.min'}))   //renameѹ������ļ���
        .pipe(minifycss())   //ִ��ѹ��
        .pipe(gulp.dest('./public/css'));   //����ļ���
});

//ѹ��js

gulp.task('minifyjs',function() {
    gulp.src('./dist/js/*.js')
        .pipe(rename({suffix: '.min'}))   //renameѹ������ļ���
        .pipe(uglify())    //ѹ��
        .pipe(gulp.dest('./public/js'));  //���
});

//ִ��ѹ��ǰ����ɾ���ļ����������
gulp.task('clean', function(cb) {
    gulp.src(['./public/js/*.js','./public/js/*.css'])
        .pipe(clean());
});

//Ĭ�������cmd������gulp bulid��ִ�еľ����������
gulp.task('bulid', ['clean'], function(){
    gulp.start('minifyjs', 'minifycss');
});


































































