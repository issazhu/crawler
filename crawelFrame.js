'use strict';
const charset = require('superagent-charset');
const request = require('superagent');
charset(request);
//爬赔率的框架
//getLinks是封装了读网页数据的接口
exports.getLinks = function(url) {
  return new Promise(function(resolve, reject) {
    request.get(url).charset('utf8').end((err, res) => {
      resolve(res.text);
    });
  });
};
//getBet返回爬到的数据并成成对象
//部分网页的数据需要自行进行Json.parse(data)
//由于每个网页的数据结构组成都不一样，所以采用了传一个工厂模式进去，也许可以有别的写法更优雅
exports.getBet = (data, millPattern) => {
  let ans = {};
  for (let i = 0; i < data.length; i++) {
    ans[i.toString()] = millPattern.call(data[i]);
  }
  return ans;
};
