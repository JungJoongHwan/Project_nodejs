/*
    writeHead(),write(),end() 함수 대신에 send()함수로 JSON을 보내기
    (p161)
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
    
    // 첫번째...
    //res.send('<h1>Express 서버에서' + req.user + '응답한 결과입니다.</h1>');
    
    // 두번째..
    //var person = {name:'소녀시대', age:20};
    //res.send(person);
    
    // 세번째..
    //var person = {name:'소녀시대', age:30};
    //var personStr = JSON.stringify(person);
    //res.send(personStr);
    
    // 네번째..
    var person = {name:'소녀시대', age:40};
    var personStr = JSON.stringify(person);
    res.writeHead(200, {'Content-Type':'application/json;charset=utf8'});
    res.write(personStr);
    res.end();
});

app.set('port', process.env.PORT || 3000);  // port속성을 추가한다...

var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('익스프레스로 웹서버를 실행함: ' + app.get('port'));
});