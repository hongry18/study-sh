# 서현 스터디

서현 NodeJS, Express, ReactJS

## git clone
git clone -b init https://github.com/hongry18/study-sh.git projectName

## Quick Start

### require dependency (global & local)
> npm install -g webpack webpack-dev-server babel-cli nodemon cross-env

### set Configure
> /config
```javascript
{
    "env": {
        "port": 80,
        "path": "/home/study02/blog"
    },
    "db": {
        "mongo": "mongodb://localhost/blog"
    },
    "session": {
        "secret": "foo",
        "maxAge": 3600,
        "millisecond": 1000
    }
}
```

* env
 * port - build 할 포트 로 변경
 * path - 프로젝트 경로 변경
* db.mongo - 몽고디비 주소
* session
 * secret
 * maxAge - 세션 유지 시간 (초)
 * millisecond - 밀리세컨드 ( 세션 유지 시간에 곱해줄때 사용 )

### start npm
> npm install<br />
npm run build && npm start
