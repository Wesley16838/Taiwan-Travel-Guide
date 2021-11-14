import axios from "axios";
import jsSHA from "jssha";

export default axios.create({
    baseURL: 'https://ptx.transportdata.tw/MOTC/v2/Tourism',
    responseType: "json",
    headers: getAuthorizationHeader()
  });

  function getAuthorizationHeader() {
    //  填入自己 ID、KEY 開始
        let AppID = '640552f682fd4ef09075b42b4dd2d19d';
        let AppKey = '_emteeVBK7VQ2amqDfpBVhmAjMU';
    //  填入自己 ID、KEY 結束
        let GMTString = new Date().toUTCString();
        let ShaObj = new jsSHA('SHA-1', 'TEXT');
        ShaObj.setHMACKey(AppKey, 'TEXT');
        ShaObj.update('x-date: ' + GMTString);
        let HMAC = ShaObj.getHMAC('B64');
        let Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
        return { 'Authorization': Authorization, 'X-Date': GMTString }; 
    }
    