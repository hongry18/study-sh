# Generate private, public RSA Key

## Generate private key
* private.pem 이름의 개인키 생성
* 1024bit 길이의 키를 생성함 숫자 더크게 해도 상관없으나 로드가 심해진다
```shell
openssl genrsa -out private.pem 1024
```

## Generate public key
* private.pem 키를 가지고 public.pem 이름의 공개키 생성
```shell
openssl rsa -in private.pem -out public.pem -outform PEM -pubout
```
