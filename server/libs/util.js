/**
 *  객체 키값 체크 없으면 false 반환
 *  객체의 key에 대한 값이 '', null, 길이가 0 일때 false 반환
 *  객체의 key에 대한 값이 object 일때 depth를 1차에 대한 size만 체크
 *
 *  usage
 *  hasParams(obj, 'name', 'key1');
 */
const hasParams = (obj, ...names) => {
    const allowType = 'string';
    var flag = true;

    for ( var key in names ) {
        const name = names[key];

        if ( typeof name !== allowType || !obj.hasOwnProperty(name) ) {
            flag = false;
            break;
        }

        if ( typeof obj[name] === 'undefined' ) {
            flag = false;
            break;
        }

        if ( typeof obj[name] === 'object' && Object.keys(obj[name]).length === 0 ) {
            flag = false;
            break;
        }

        if ( obj[name] === null || obj[name] === '' || obj[name].length === 0 ) {
            flag = false;
            break;
        }
    }

    return flag;
}

/**
 *  value가 숫자로 변경 가능하거나 숫자인지 확인
 */
const isNumeric = ( val ) => {
    if ( typeof val === 'number' ) {
        return true;
    }

    if ( !/[^0-9]+/.test(val) ) {
        return true;
    }

    return false;
}

/**
 * 값들이 원하는 type인지 확인
 * 하나라도 틀리면 false 반환
 *
 * usage
 * validationTypes('string', val1, val2, val3);
 */
const validationTypes = (type, ...vals) => {
    var flag = true;

    for ( var _v in vals ) {
        if ( typeof _v !== type ) {
            flag = false;
            break;
        }
    }

    return true;
}

export {
    hasParams,
    isNumeric,
    validationTypes
}
