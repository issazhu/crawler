'use strict';
const charset = require('superagent-charset');
const request = require('superagent');
const cheerio = require('cheerio');
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
exports.getBet = function(data, millPattern) {
  let betdata = {};
  for (let i = 0; i < data.length; i++) {
    betdata[i.toString()] = millPattern.call(data[i]);
  }
  return betdata;
};
//cheerio版的getBet
//tagName的适用范围和jquery的$()一样
exports.getBet_Cheerio = function(data, millPattern, tagName) {
  let $ = cheerio.load(data);
  let betData = {};
  $(tagName).map((i, elem) => {
    betData[i.toString()] = millPattern.call($(elem));
  });
  return betData;
};
exports.mixBetData = function(obj1, obj2) {
  let arr = Object.keys(obj1).map(function(value) {
    return obj2[value].id;
  });
  Object.keys(obj1).forEach(function(value, index) {
    Object.assign(obj1[index], obj2[arr.indexOf(obj1[value].id)]);
  });
  return obj1;
};
