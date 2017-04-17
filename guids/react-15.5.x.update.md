# React Update
15.5 이상부터 React.PropTypes 대신 prop-types 패키지를 이용하여 사용한다고 함

## dependency install
> npm install --save prop-types

## usage
기존에 이렇게 React packge에서 참조하였다면
```javascript
...

Object.propTypes = {
    isLoggedIn: React.PropTypes.bool,
    onLogout: React.PropTypes.func
};
```

아래처럼 prop-types 패키지를 이용해서 참조해줘야함
```javascript
import PropTypes from 'prop-types';

...

Object.propTypes = {
    isLoggedIn: PropTypes.bool,
    onLogout: PropTypes.func
};
```

그렇지 않으면
> Accessing PropTypes via the main React package is deprecated

위의 에러가 날 것임
