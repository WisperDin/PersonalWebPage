
const utils = {
  parseParam(obj) {
    if (!obj) return '';
    let pair = [];
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        pair.push(`${encodeURIComponent(key)}=${obj[key]}`);
      }
    }
    return pair.join('&')
  }
};

export default utils;
