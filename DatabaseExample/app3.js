
// express 기본 모듈 불러오기
var express = require('express');
var http = require('http');
var path = require('path');

// express의 미들웨어 불러오기
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var static = require('serve-static');

// 오류 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');

// Session 미들웨어 불러오기
var expressSession = require('express-session');

// 몽구스 모듈 사용
var mongoose = require('mongoose');     // 수정.

// 데이터베이스 객체를 위한 변수 선언
var database;
var UserSchema; // 데이터베이스 스키마 객체를 위한 변수. 추가
var UserModel;  // 데이터베이스 모델 객체를 위한 변수. 추가

// 데이터베이스 연결
function connectDB() {
    //-------------------------------------------------------------------------------- 수정.
    var databaseUrl = 'mongodb://localhost:27017/test';        // 데이터베이스 연결정보. 책하고 달리 내컴퓨터에는 이렇게 되어 있다..

    console.log('데이터베이스 연결을 시도합니다.');

    mongoose.Promise = global.Promise;
    mongoose.connect(databaseUrl);
    database = mongoose.connection;

    database.on('error', console.error.bind(console, 'mongoose connection error.') );
    database.on('open', function() {
        console.log('데이터베이스에 연결되었습니다. : ' + databaseUrl);

        // 스키마정의
        UserSchema = mongoose.Schema({
            id: String,
            name: String,
            password: String
        });
        console.log('UserSchema 정의함.');

        // UserModel 모델 정의
        UserModel = mongoose.model('users', UserSchema);
        console.log('UserModel 정의함');
    });
    database.on('disconnected', function() {
        console.log('연결이 끊어졌습니다. 5초후에 다시 연결합니다.');
        setInterval(connectDB, 5000);
    });
    //--------------------------------------------------------------------------------
}

// 사용자를 인증하는 함수
var authUser = function(db, id, password, callback) {
    console.log('authUser 호출됨');

    //-------------------------------------------------------------------------------- 수정.
    // 아이디와 비밀번호를 사용하여 검색
    UserModel.find({'id':id, 'password':password}, function(err, results) {
        if (err) {
            callback(err, null);
            return;
        }

        console.log('아이디[%s] 비밀번호[%s]로 사용자검색 결과', id, password);
        console.dir(results);

        if (results.length > 0) {
            console.log('일치하는 사용자 찾음.', id, password);
            callback(null, results);
        } else {
            console.log('일치하는 사용자를 찾지 못함.');
            callback(null, null);
        }
    });
    //--------------------------------------------------------------------------------
}

// 사용자를 추가하는 함수
// -> 먼저 사용자가 있는지 확인하고 넣어야 하는데.. 그냥 넣고 있네... 
var addUser = function(db, id, password, name, callback) {
    console.log('addUser 호출됨');

    //-------------------------------------------------------------------------------- 수정.

    // UserModel 인스턴스 생성 --> 모델의 인스턴스는 몽구스의 Document라고 부른다..
    var user = new UserModel({'id':id, 'password':password, 'name':name});

    // Save로 저장.
    user.save(function(err) {
        if (err) {
            callback(err, null);
            return;
        }

        console.log('사용자 데이터 추가함');
        callback(null, users);
    });
    //--------------------------------------------------------------------------------
}

var app = express();

app.set('port', process.env.PORT || 3000);
app.use('/public', static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(expressSession({
    secret:'my key',
    resave:true,
    saveUninitialized:true
}));


var router = express.Router();

// ..... Router .....

app.post('/process/login', function(req, res) {
    console.log('/process/login 호출됨');

    var paramId = req.param('id');
    var paramPassword = req.param('password');

    if (database) {
        authUser(database, paramId, paramPassword, function(err, docs) {
            if (err) {throw err;}

            if (docs) {
                console.dir(docs);
                var username = docs[0].name;
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h1>로그인 성공<h1>');
                res.write('<div><p>사용자 아이디 : ' + paramId + '</p></div>');
                res.write('<div><p>사용자 이름 : ' + username + '</p></div>');
                res.write("<br><br><a href='/public/login.html'>다시 로그인하기</a>");
                res.end();
            } else {
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h1>로그인 실패<h1>');
                res.write('<div><p>아이디와 비밀번호를 다시 확인하십시오.</p></div>');
                res.write("<br><br><a href='/public/login.html'>다시 로그인하기</a>");
                res.end();
            }
        });
    } else {
        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        res.write('<h2>데이터베이스 연결 실패<h2>');
        res.write('<div><p>데이터베이스에 연결하지 못했습니다.</p></div>');
        res.end();
    }
});

// 사용자추가 라우팅 함수, 클라이언트에서 보내온 데이터를 이용해 데이터베이스에 추가
router.route('/process/adduser').post(function(req, res) {
    console.log('/process/adduser 호출됨');

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    var paramName = req.body.name || req.query.name;

    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword + ', ' + paramName);

    if (database) {
        addUser(database, paramId, paramPassword, paramName, function(err, result) {
            if (err) { throw err;}

            // 결과 객체를 확인하여 추가된 데이터가 있으면 성공 응답 전송
            // ---> 이상하다...  result객체는 user객체이고 그 안에 insertCount는 undefined되어 있다고 나온다.
            //if (result && result.insertedCount > 0) {  
            if (result) {
                console.dir(result);

                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>사용자추가 성공<h2>');
                res.end();
            } else {
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>사용자추가 실패<h2>');
                res.end();
            }
        });
    } else {    // 데이터베이스 객체가 초기화되지 않은 경우.. 실패응답 전송
        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        res.write('<h2>데이터베이스 연결 실패<h2>');
        res.end();
    }
});


router.route('/process/login').post(function(req, res) {
    console.log('/process/login 호출됨.');
});


app.use('/', router);

// 404에러 페이지 처리
var errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html'
    }
});

app.use( expressErrorHandler.httpError(404) );
app.use( errorHandler );

// Express 서버 시작
http.createServer(app).listen(app.get('port'), function() {
    console.log('서버가 시작되었습니다. 포트: ' + app.get('port'));

    // 데이터베이스 연결
    connectDB();
});