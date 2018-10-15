/*
    static미들웨어를 통해서 이미지파일 노출

    require('serve-static') 해야한다.
    아래는 path모듈이 사용되므로 require('path')해야한다.

    express.static 해도 되고... 그냥 static해도 된다.. 뭔차이인지 모른다.

    public디레토리를 /(루트) 밑에 둘때...
        app.set(express.static(path.join(__dirname, 'public')));
        또는
        app.set(static(path.join(__dirname, 'public')));

    public디렉토리를 /public 밑에 둘때...
        app.set('/public', express.static(path.join(__dirname, 'public')));
        또는
        app.set('/public', static(path.join(__dirname, 'public')));
*/
var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));
//app.use('/public', express.static(path.join(__dirname, 'public')));

var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('익스프레스로 웹서버를 실행함: ' + app.get('port'));
});