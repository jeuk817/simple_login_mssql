# simple_login_mssql
mssql 서버와 연동하는 간단한 로그인 앱

## 과정
1. Microsoft SQLServer Express, SSMS를 설치
2. Window SQL Server 원결설정 - 로그인앱에 연결
3. JWT를 이용한 간단한 로그인페이지 구현
4. iis에 reverse porxy server 설정 - node.js 실행모듈과 연결
5. 확인 후 종료

### +추가할 것
6. kakao 주소 api
7. 핸드폰 본인인증 기능

## API
- 로그인페이지 ```GET /```
- 회원가입페이지 ```GET /signUpPage```
- 회원가입 ```POST /signUp```
- 로그인 ```POST /signIn```
- 로그아웃 ```GET /singOut```

