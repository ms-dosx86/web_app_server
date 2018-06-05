const fs = require('fs');
module.exports = (path, data) => {
    return new Promise(resolve => {
        fs.writeFile(path, data, resolve);
    })
}