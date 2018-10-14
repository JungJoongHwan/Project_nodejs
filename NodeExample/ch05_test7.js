/***********************************************************

    서버에서 다른 웹 사이트의 데이터를 가져와 응답하기

    http객체의 get()메소드를 사용하면 다른 사이트에 요청을 보내고 응답을 받아 처리할 수 있다.
    첫번째 파라미터는 다른 사이트정보 객체이고, 두번째 파라미터는 콜백함수이다.
    응답데이터를 받을때는 data이벤트와 end이벤트로 처리하면 된다.

    아래에서는 구글에서 데이터를 받아 콘솔에 출력한다.
    
***********************************************************/

var http = require('http');

var options = {
    host: 'www.google.com',
    port: 80,
    path: '/'
};

var req = http.get(options, function(res) {
    // 응답처리
    var resData = '';
    res.on('data', function(chunk) {
        resData += chunk;
    });

    res.on('end', function() {
        console.log(resData);
    });
});

req.on('error', function(err) {
    console.log('오류발생: ' + err.message);
});