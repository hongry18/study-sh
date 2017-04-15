let VERBOSE = true;

export function log(msg) {
    if(VERBOSE) console.log(msg);
};

export function error(msg) {
    if(VERBOSE) console.error(msg);
};
