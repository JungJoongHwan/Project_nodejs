/***********************************************************

    클라이언트에서 요청이 있을때 파일 읽어 응답하기 (p143)

***********************************************************/

var http = require('http');
var fs = require('fs');

var server = http.createServer();

var port = 3000;
server.listen(port, function() {
    console.log('웹서버가 시작되었습니다. : %d', port);
});

// 클라이언트 연결이벤트 처리
server.on('connection', function(socket) {
    var addr = socket.address();
    console.log('클라이언트가 접속했습니다.: %s, %d', addr.address, addr.port);
});

// 클라이언트 요청 이벤트 처리
server.on('request', function(req, res) {
    console.log('클라이언트 요청이 들어왔습니다.');

    var filename = 'house.png';
    fs.readFile(filename, function(err, data) {
        res.writeHead(200, {"Content-Type": "image/png"});
        res.write(data);
        res.end();
    });
});

// 서버 종료 이벤트 처리
server.on('close', function() {
    console.log('서버가 종료됩니다.');
});
