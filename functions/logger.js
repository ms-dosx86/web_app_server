const fs = require('fs');

module.exports = (path, data) => {
    let stream = fs.createWriteStream(path, { flags: 'a', encoding: 'utf8' });
    stream.write(data + '\n');
    stream.close();
}