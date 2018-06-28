const fs = require('fs');

function isExist(path) {
    return new Promise(resolve => {
        fs.exists(path, resolve);
    });
}

function mkdir(path) {
    return new Promise(resolve => {
        fs.mkdir(path, resolve);
    });
}

module.exports.isExist = isExist;
module.exports.mkdir = mkdir;