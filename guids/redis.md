# REDIS

redis 설치 및 express session store로 사용하는 방법

* redis 3.2.8

## redis Download

* (REDIS)[https://redis.io/download]
* (redis-3.2.8)[http://download.redis.io/releases/redis-3.2.8.tar.gz]

## redis install

```shell
tar zxf redis-3.2.8.tar.gz
cd redis-3.2.8
make && make install
```

설치후 redis-server로 서버를 실행하면 6379 포트에 서버가 열린다.<br />

## redis-server background 실행방법
redis-3.2.8/redis.conf

```shell
daemonize yes
```
daemonize 의 값을 no에서 yes로 변경후 redis-server 실행
```
redis-server redis-3.2.8/redis.conf
```

## redis client 사용
`redis-cli` 를 입력하면 터미널에서 redis접속<br />
명령어는 (여기)[http://redis.io/commands]에 있음.

## npm redis dependency install
> npm install --save connect-redis redis express

## usage redis store
```
import session from 'express-session';
import redis from 'redis';
import redisStore from 'connect-redis';

redisStore = new redisStore(session);
const client = redis.createClient();

app.use(session(
    {
        secret: 'foo',
        store: new redisStore({
            host: "127.0.0.1",
            port: 6379,
            client: client,
            prefix : "session:",
            db : 0
        }),
        saveUninitialized: false, // don't create session until something stored,
        resave: true // don't save session if unmodified
    }
));
```
