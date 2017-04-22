import config from 'config';

let VERBOSE = config.get('env.debug');

export function log(msg) {
    if(VERBOSE) console.log(msg);
};

export function error(msg) {
    if(VERBOSE) console.error(msg);
};
