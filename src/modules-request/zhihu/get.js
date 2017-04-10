'use strict';
const request = require('request');

const get = (url, qs, headers = {}) => {
  headers.authorization = 'Bearer Mi4wQUJETVJDS3pkQWdBQUlLY2ROSlNDeGNBQUFCaEFsVk4zOHNTV1FCM0lBVjZEVmlkYkFnUElPZlNjb2Z2Vlk4UGdR|1491812138|8e802a21dd8de8f7410a0ac6d25f0adabcde05a3';
  headers.Cookie = 'd_c0="AACCnHTSUguPTvebJ1FtyFlI5lMzxJDQ_t8=|1487316657"; _zap=659a6e5f-d6c8-49e6-9554-4d2ac03df956; q_c1=cecd53c5fee54586b16e688a201e7c78|1490234733000|1487316657000; aliyungf_tc=AQAAAK34GVKWUQYACx56febQ7sFzEYaE; _xsrf=96c4ff3daf11fa7b7e604b719b564bea; r_cap_id="ODllMjkyMjc3NTRjNDRiYmE5OTk4ZjE1OGJhMTkxOTQ=|1491812045|ed1cb1e53cf7e5d7724669a2a4ab823bb9ccac60"; cap_id="YmVjNmQzNDgxOTUwNDYzNDhiZTg1NGVkZGE3YjNhNGU=|1491812045|d87cb0ab567b16f92f9312b916cb6f0aa9bbbc2d"; l_n_c=1; z_c0=Mi4wQUJETVJDS3pkQWdBQUlLY2ROSlNDeGNBQUFCaEFsVk4zOHNTV1FCM0lBVjZEVmlkYkFnUElPZlNjb2Z2Vlk4UGdR|1491812138|8e802a21dd8de8f7410a0ac6d25f0adabcde05a3; s-q=%E6%9D%8E%E5%BC%80%E5%A4%8D; s-i=1; sid=etg0kno8; __utma=155987696.25855901.1491812263.1491812263.1491812263.1; __utmc=155987696; __utmz=155987696.1491812263.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)';

  return new Promise((resolve, reject) => {
    request({
      method: 'GET',
      url,
      qs,
      headers
    }, (err, res, body) => {
      if(err)
        return reject(err);
      resolve({ res, body });
    });
  });
};

module.exports = get;
