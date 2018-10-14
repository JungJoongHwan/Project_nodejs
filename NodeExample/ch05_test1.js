/***********************************************************

    웹서버 생성 

    포트만 지정해서 서버를 실행시키거나, 호스트와 포트를 모두 지정해서 실행시킬 수 있다.

***********************************************************/

var http = require('http');

var server = http.createServer();

/*
var port = 3000;

server.listen(port, function() {
    console.log('웹서버가 시작되었습니다. : %d', port);
});
*/

var host = '192.168.25.21';
var port = 3000
server.listen(port, host, '50000', function() {
    console.log('웹서버가 시작되었습니다. : %s, %d', host, port);
});
