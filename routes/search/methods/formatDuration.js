module.exports = duration => {
    let match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    match = match.slice(1).map(x => {
      if (x != null) {
          return x.replace(/\D/, '');
      }
    });
    let hours = (parseInt(match[0]) || 0);
    let minutes = (parseInt(match[1]) || 0);
    let seconds = (parseInt(match[2]) || 0);
    if (hours > 0) {
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        return '' + hours + ':' + minutes + ':' + seconds;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    return '' + minutes + ':' + seconds;
  }