/***********************************************************

    클라이언트가 웹서버에 요청할때 발생하는 이벤트 처리하기
    - 서버객체를 만들때 사용한 createServer()메소드 호출부분에 응답코드 넣기

***********************************************************/

var http = require('http');

var server = http.createServer(function(req, res) {
    console.log('클라이언트 요청이 들어왔습니다.');

    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    res.write("<!DOCTYPE html>");
    res.write("<html>");
    res.write("  <head>");
    res.write("    <title>응답페이지</title>");
    res.write("  </head>");
    res.write("  <body>");
    res.write("    <h1>node.js로부터의 응답페이지</h1>");
    res.write("  </body>");
    res.write("</html>");
    res.end();
});

var port = 3000;
server.listen(port, function() {
    console.log('웹서버가 시작되었습니다. : %d', port);
});

// 클라이언트 연결이벤트 처리
server.on('connection', function(socket) {
    var addr = socket.address();
    console.log('클라이언트가 접속했습니다.: %s, %d', addr.address, addr.port);
});

// 서버 종료 이벤트 처리
server.on('close', function() {
    console.log('서버가 종료됩니다.');
});

