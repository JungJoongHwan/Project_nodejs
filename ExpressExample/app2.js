/*
    use()메소드를 사용한 미들웨어 설정 알아보기 (p157)
*/

var express = require('express');
var http = require('http');

var app = express();

app.use(function(req, res, next) {
    console.log('첫번째 미들웨어 호출됨.');
    
    res.writeHead(200, {'Content-Type':'text/html;charset=utf8'});
    res.end('<h1>Express서버에서 응답한 결과입니다.</h1>');
});

app.set('port', process.env.PORT || 3000);  // port속성을 추가한다...

var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('[app2.js]익스프레스로 웹서버를 실행함: ' + app.get('port'));
});