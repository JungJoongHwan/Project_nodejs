/*
    body-parser 미들웨어
    (app6.js를 가져와서 수정)
*/

var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    console.log('첫번째 미들웨어에서 요청을 처리함.');

    //var paramId = req.param('id');
    //var paramPassword = req.param('password');

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;

    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
    res.write('<div><p>Param id : ' + paramId + '</p></div>');
    res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
    res.end();
});

var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('[app7.js]익스프레스로 웹서버를 실행함: ' + app.get('port'));
});