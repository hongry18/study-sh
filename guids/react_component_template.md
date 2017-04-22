# React 컴포넌트 템플릿 (redux 연결)
```js
'use strict';
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

class Foo extends Component {
    // MOUNTING METHODS
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    render() {
    }

    componentDidMount() {
    }

    // LIFE CYCLE METHODS
    componentWillReceiveProps(nextProps) {
    }

    shouldComponentUpdate(nextProps, nextState) {
    }

    componentWillUpdate(nextProps, nextState) {
    }

    componentDidUpdate(prevProps, prevState) {
    }

    componentWillUnmount() {
    }
}

Foo.propTypes = {
    // bar: PropTypes.string,
}

Foo.defaultProps = {
    // bar: 'value',
};

const mapStateToProps = (state) => {
    return {
        // state -> props
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        // dispatch -> props
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Foo);
```
