/*
    여러개의 미들웨어 등록하여 사용하는 방법 알아보기 (p159)

    미들웨어는 요청객체(req)와 응답객체(res)를 사용할수 있고.. app객체는 req.app 로 참조할 수 있다.
    미들웨어 두개를 등록한다. next()메소드를 호출하여 처리순서를 넘겨준다. 
    첫번재 미들웨어에서 req객체에 user속성과 값을 추가했다.
    두번재 미들웨어에서 req객체에 user속성을 사용한다..
*/

var express = require('express');
var http = require('http');

var app = express();

app.use(function(req, res, next) {
    console.log('첫번째 미들웨어 호출됨.');
    
    req.user = 'mike';
    
    next();
});

app.use(function(req, res, next) {
    console.log('두번째 미들웨어 호출됨.');
    
    res.writeHead(200, {'Content-Type':'text/html;charset=utf8'});
    res.end('<h1>Express 서버에서' + req.user + '응답한 결과입니다.</h1>');
});

app.set('port', process.env.PORT || 3000);  // port속성을 추가한다...

var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('[app3.js]익스프레스로 웹서버를 실행함: ' + app.get('port'));
});