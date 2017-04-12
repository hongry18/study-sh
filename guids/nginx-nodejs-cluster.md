# Nginx NodeJS Clustering

## nginx install

### dependency
* [pcre-8.x](ftp://ftp.csx.cam.ac.uk/pub/software/programming/pcre/)
* [openssl-1.x](http://www.openssl.org/source/)
* [zlib](http://zlib.net/)
* [extenal module lists](https://www.nginx.com/resources/wiki/modules/)
* gcc-c++

#### pcre
```shell
wget ftp://ftp.csx.cam.ac.uk/pub/software/programming/pcre/pcre-8.40.tar.gz
tar -zxf pcre-8.40.tar.gz
```

#### openssl
```shell
wget https://www.openssl.org/source/openssl-1.1.0e.tar.gz
tar -zxf openssl-1.1.0e.tar.gz
```

#### zlib
```shell
wget http://zlib.net/zlib-1.2.11.tar.gz
tar -zxf zlib-1.2.11.tar.gz
```

#### gcc-c++
```shell
yum install gcc-c++
apt-get install gcc-c++
```

#### nginx extenal modules
필요한 외부 모듈은 [여기](https://www.nginx.com/resources/wiki/modules/) 해당 링크에서 찾아 다운로드후 압축해제

### install
#### configure
```shell
./configure --with-zlib=../zlib-1.2.11 --with-pcre=../pcre-8.40 --with-openssl=../openssl-1.1.0e --with-http_ssl_module --with-debug --prefix=/usr/local/nginx

# 만약 외부모듈이 존재한다면 아래부분 추가
--add-module=../모듈명

# 사용자 권한으로 nginx 실행시 아래부분 추가 (추가전에 해당 사용자, 그룹을 만들거나 꼭 아래의 사용자,그룹 명이 아니어도 상관없음)
--user=www-data --group=www-data
```

## nginx setting
### nginxDir/nginx.conf
```shell
http {
    ...

    upstream io_nodes {
        ip_hash;
        server 127.0.0.1:6000;
        server 127.0.0.1:6001;
    }

    server {
        listen 80;
        server_name localhost;
        location / {
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $host;
            proxy_http_version 1.1;
            proxy_pass http://io_nodes;
        }
    }

    ...
}
```

## nodejs Setting
### file structure
```
server/
    main.js
    ...
public/
    index.html
    ...
src/
    index.js
    components/
    containers/
...
```

### edit server/main.js
```javascript
var express = require('express');
var app = express();
// add listen port
var port = process.argv[2];

app.listen(port, () => {
    console.log( 'Express is listening on port ', port );
});
```

### start nodejs
```shell
node server/main.js 6000
node server/main.js 6001
```
