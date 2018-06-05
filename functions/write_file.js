const fs = require('fs');
module.exports = async (path, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, err => {
            if (err) reject(err);
            resolve();
        });
    })
}