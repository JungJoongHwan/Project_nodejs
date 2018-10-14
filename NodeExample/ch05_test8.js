/***********************************************************

    서버에서 다른 웹 사이트의 데이터를 가져와 응답하기2

    post방식으로 가져오기..
    post방식은 request()메소드를 사용하며, 요청헤더와 본문을 직접 설정히야 한다
    
***********************************************************/

var http = require('http');

var opts = {
    host: 'www.google.com',
    port: 80,
    method: 'POST',
    path: '/',
    headers: {}
};

var resData = '';
var req = http.request(opts, function(res) {
    // 응답처리
    res.on('data', function(chunk) {
        resData += chunk;
    });
    res.on('end', function() {
        console.log(resData);
    });
});

// 요청헤더와 본문을 직접 설정한다.
opts.headers['content-Type'] = 'application/x-www-form-urlencoded';
req.data = 'q=actor';
opts.headers['Content-Length'] = req.data.length;

req.on('error', function(err) {
    console.log('오류발생 : ' + err.message);
});

// 요청전송
req.write(req.data);
req.end();