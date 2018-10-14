/*
    새로운 익스프레스 프로젝트 만들기 (p152)

    익스프레스서버객체

    set(name, value) - 서버설정을 위한 속성을 지정한다. set()메소드로 지정한 속성은 get()메소드로 확인할수 있다.
    get(name) - 서버 설정을 위해 속성을 꺼내온다.
    use([path,] function [,function...]) - 미들웨어함수를 사용한다.
    get(]path,] function) - 특정패스로 요청된 정보를 처리한다.
*/
var express = require('express');
var http = require('http');

var app = express();

app.set('port', process.env.PORT || 3000);  // port속성을 추가한다...

var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('[app.js]익스프레스로 웹서버를 실행함: ' + app.get('port'));
});