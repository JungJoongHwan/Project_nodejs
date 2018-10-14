/*
    User-Agent와 Param을 확인하기 (p164)
*/

var express = require('express');
var http = require('http');

var app = express();

app.use(function(req, res, next) {
    console.log('첫번째 미들웨어 호출됨.');

    var userAgent = req.header('User-Agent');
    var paramName = req.param('name');  // req.query.name; 도 됨...
    
    res.send('<h3>User-Agent: ' + userAgent + '</h3>\
              <h3>Param name: ' + paramName + '</h3>');
    
});

app.set('port', process.env.PORT || 3000);  // port속성을 추가한다...

var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('익스프레스로 웹서버를 실행함: ' + app.get('port'));
});