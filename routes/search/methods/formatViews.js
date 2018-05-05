module.exports = viewCount => {
    if (viewCount) {
        let arr = viewCount.split('');
        let count = 0;
        for (let i = arr.length - 1; i > 0; i--) {
            count++;
            if (count % 3 === 0) {
                arr[i] = ' ' + arr[i];
            }
        }
        return arr.join('');
    }
    return '0';
}