# MongoDB 명령어

## 데이터베이스
DB 선택			`> use <dbname>`

현재 DB 확인		`> db`

DB 목록보기		`> show dbs`

## 콜렉션
콜렉션 생성		`> db.createCollection(<name>, [options])`

콜렉션 보기		`> db collections`

콜렉션 삭제		`> db.collection.drop()`

## 도큐멘트
도큐멘트 삽입		`> db.collection.insert([documents])`

도큐멘트 삭제		`> db.collection.remove(<criteria>, justOne)`

도큐멘트 선택		`> db.collection.find(<query>, <projection>)`

커서 예쁘게 출력	`> <cursor>.pretty()`

## 쿼리 연산자
=, !=		`$eq, $neq`

포함, 미포함	`$in, $nin`

<,<=,>,>=	`$lt, $lte, $gt, $gte`

OR, AND	`$or, $and`

RegEx
```
$regex: /pattern/, $option: <option>
$regex: /pattern/<option>
/pattern/<option>
<option>은 i,m,x,s가 있음
i case-insensitive
m \n이 있을 때 anchor(^)가 무효
x whitespace 무시
s dot사용시 \n 포함
```

자바스크립트 연산자 사용하기 `$where`

embedded document 배열 쿼리 `$elemMatch` (elem Match임)
 
## 쿼리의 Projection
리턴값은 마찬가지로 cursor임

`.sort({<field>:  [1: 오름차순, -1:내림차순})`

`.limit(n)`  n개 출력

`.skip(n)` n개 생략 후 출력

## 도큐멘트 업데이트
```
db.collection.update( 
	<query>,
	<update>,
	{
		upsert: <bool>,
		multi:	<bool>,
		writeConcern:	<document>
	}
)
```

**<update>**
특정 필드만 업데이트 `{$set: {<field>: value} })`

특정 필드 제거 `{$unset: {<field>: 1} })`

도큐멘트 교체 `db.collection.update(<query>, <document>)`

배열에 값 추가 `{$push: …)`

배열에 값 여러개 추가
```
{$push: {
		<field>: {
			$each:[val1, val2, ...]
			$sort: 1
		}
}
```

배열에서 값 제거 `{$pull: {<field>: value}}`

배열에서 값 여러개 제거 (**push**에서 연산자만 **pull**로)
```
{$pull: {
		<field>: {
			$each:[val1, val2, ...]
			$sort: 1
		}
}
```

## 인덱스
인덱스 생성 createIndex
`db.collection.createIndex(<key type>, <index type>, <option>)`

인덱스 보기 getIndexes `db.collection.getIndexes()`

인덱스 제거 dropIndex `db.collection.getIndex(<field>)`

모든 인덱스 제거 `db.collection.getIndexes()`
