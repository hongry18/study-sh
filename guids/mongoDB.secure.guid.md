# mongoDB Secure

## use admin
admin db 사용
```javascript
use admin
```

## create admin
먼저 관리자계정 생성
```javascript
db.createUser(
  {
    user: "admin",
    pwd: "foo",
    roles: [ { role: "userAdminAnyDatabase", "dbAdminAnyDatabase", "readWriteAnyDatabase", db: "admin" } ]
  }
)
```

## external bind
외부 접속 허용 방법
```shell
# network interfaces
net:
  # 기본포트
  # port: 27017
  # 내부접속만 가능한 로컬 ip bind
  # bindIp: 127.0.0.1
  
  # 사용하고 싶은 포트
  port: 27000
  # 모든 외부접속 허용시
  bindIp: 0.0.0.0

  # 일부 ip에 한해서 허용
  # bindIp: 127.0.0.1, 192.168.99.100, 192.168.99.101
```

## authorization enble
authorization을 enabled로 설정하면 암호없는 사용자는 접속 불가
```shell
security:
  authorization: enabled
```

## 위 설정이 되었다면 mongo 재시작
```shell
service mongod restart
```

## 일반 사용자 만들기
해당 데이터베이스에 사용자 추가
```javascript
use database_name
db.createUser({ user: user_name,
          pwd: "password",
          roles: ["dbAdmin", "readWrite"]
})
```


## 외부접속 format
```shell
# 몽고 클라이언트를 이용해 접속
mongo --port <포트> -u "<사용자 계정>" -p "<비밀번호>" --authenticationDatabase "<databse>"
# mongo --port 27000 -u user_name -p password --authenicationDatabase database_name

# uri를 이용해 접속
mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]
# mongodb://user_name:password@127.0.0.1:27000/database_name
```
