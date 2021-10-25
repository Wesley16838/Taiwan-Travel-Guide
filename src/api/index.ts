import axios from "axios";
import React from "react";

const client = axios.create({
    baseURL: "https://ptx.transportdata.tw/MOTC/v2/Tourism",
    responseType: "json"
  });