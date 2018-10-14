/*
    redirect() 메소드로 무조건 다른페이지로 이동하기 (p163)
*/

var express = require('express');
var http = require('http');

var app = express();

app.use(function(req, res, next) {
    console.log('첫번째 미들웨어 호출됨.');
    
    res.redirect('http://google.co.kr');
});

app.set('port', process.env.PORT || 3000);  // port속성을 추가한다...

var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('익스프레스로 웹서버를 실행함: ' + app.get('port'));
});