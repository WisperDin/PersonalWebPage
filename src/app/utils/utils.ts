
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
  },

  customAlert(alerts:any[],type,msg:string,timeout?:number):void{
    if(!alerts){
      console.error('customAlert alerts null')
      return
    }
    if(!type){
      console.error('customAlert type null')
      return
    }
    if(!msg){
      console.error('customAlert msg null')
      return
    }
    let Timeout:number=500;
    if(timeout){
      Timeout=timeout
    }
    alerts.push({
      type: type,
      msg: msg,
      timeout: Timeout
    });
  }
};

export default utils;
