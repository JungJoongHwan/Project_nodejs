/***********************************************************

    파일을 스트림으로 읽어 응답보내기 (p145)
    
    파일을 버퍼에 담아두고 일부분만 읽어 응답보내기 (p1346)

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

// 1. 파일을 스트림으로 읽어 응답보내기
// -> 헤더를 설정할 수 없는 등의 제약이 생긴다...
//    var filename = 'house.png';
//    var infile = fs.createReadStream(filename, {flags:'r'});
//    
//    // 파이프로 연결하여 알아서 처리하도록 설정하기
//    infile.pipe(res);
    
// 2. 파일을 버퍼에 담아 두고 일부분만 읽어 응답보내기
    var filename = 'house.png';
    var infile = fs.createReadStream(filename, {flags:'r'});
    var filelength = 0;
    var curlength = 0;
    
    fs.stat(filename, function(err, stats) {
        filelength = stats.size;
    });
    
    // 헤더쓰기
    res.writeHead(200, {"Content-Type": "image/png"});
    
    // 파일내용을 스트림에서 읽어 본문 쓰기
    infile.on('readable', function() {
        var chunk;
        while (null != (chunk = infile.read())) {
            console.log('읽어들인 데이터 크기: %d 바이트', chunk.length);
            curlength += chunk.length;
            res.write(chunk, 'utf8', function(err) {
                console.log('파일 부분 쓰기 완료: %d, 파일 크기: %d', curlength, filelength);
                if (curlength >= filelength) {
                    // 응답 전송하기
                    res.end();
                }
            });
        }
    });
});

// 서버 종료 이벤트 처리
server.on('close', function() {
    console.log('서버가 종료됩니다.');
});
