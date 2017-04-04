# 서현 스터디

서현 NodeJS, Express, ReactJS

## git clone
> git clone -b init https://github.com/hongry18/study-sh.git projectName

## project Envrionment

### require dependency
> axios@0.15.3, bcryptjs@2.4.3, body-parser@1.17.1, config@1.25.1, connect-mongo@1.3.2, express@4.14.0, express-session@1.15.1, mongoose@4.9.1, mongoose-auto-increment@5.0.1, morgan@1.8.1, path@0.12.7, react@15.4.2, react-addons-update@15.4.2, react-dom@15.4.2, react-redux@4.4.5, react-router@3.0.2, react-timeago@3.2.0, redux@3.6.0, redux-thunk@2.2.0

### require devel dependency
> babel-core@6.9.1, babel-loader@6.2.4, babel-plugin-root-import@5.1.0, babel-preset-es2015@6.9.0, babel-preset-react@6.5.0, css-loader@0.27.3, react-addons-perf@15.4.2, react-hot-loader@1.3.0, style-loader@0.16.0, webpack@1.13.1, webpack-dev-server@1.14.1

## Quick Start

### global require dependency install
> npm install -g webpack webpack-dev-server babel-cli nodemon cross-env

### local require dependency install
> npm install

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
> npm run build && npm start
