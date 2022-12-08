import axios from "axios";
import { getWithExpiry, setWithExpiry } from "../utils/helper";

export default axios.create({
    baseURL: 'https://tdx.transportdata.tw/api/basic/v2/Tourism/',
    responseType: "json",
  });

export async function GetAuthorizationHeader() {
    try{
        const token = getWithExpiry('token');
        console.log('token,', token)
        if(token) return token;
        const parameter: any = {
            grant_type:"client_credentials",
            client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
            client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET
        };
        let auth_url: any = process.env.NEXT_PUBLIC_AUTH_URL;
        const res:any = await axios.post(auth_url,  new URLSearchParams(parameter), {
            headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        console.log('res,', res)
        const new_token = res.data.access_token
        console.log('new_token,', new_token)
        setWithExpiry('token', new_token, 86400)
        return new_token;
    }catch(err) {
        console.log(err)
    }
}

