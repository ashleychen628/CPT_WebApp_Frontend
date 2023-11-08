// import axios from 'axios'

import { local } from "d3";

// const baseUrl = () => {
//     return localUrl;
// }
// const getUrl = () => {
//     return axios.get(baseUrl);
// }

// const create = (newObject) => {
//     return axios.post(baseUrl,newObject);
// }

// // eslint-disable-next-line
// export default {
//     getUrl:getUrl,
//     create:create
// }
const awsUrl = "https://n7ypyxmdo0.execute-api.us-east-2.amazonaws.com/dev/";
const localUrl = 'http://127.0.0.1:5000/';
    
const baseUrl = () => {
    return localUrl;
}

// eslint-disable-next-line
export default {
    // baseUrl: localUrl
    baseUrl: awsUrl
}
