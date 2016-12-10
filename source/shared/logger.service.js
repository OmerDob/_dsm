'use strict';

const BASE_LOG_LEVEL = 0;
const DEFAULT_LOG_LEVEL = 1;

var logLevel;

module.exports = {
    log: log,
    turnOnLog: turnOnLog,
    turnOffLog: turnOffLog
};

function ctor() {
    logLevel = BASE_LOG_LEVEL;
}

function log(level, content) {
    if (level <= logLevel) {
        console.log(content);
    }
}

function turnOnLog(level) {
    logLevel = level || DEFAULT_LOG_LEVEL;
}

function turnOffLog() {
    logLevel = BASE_LOG_LEVEL;
}

ctor();