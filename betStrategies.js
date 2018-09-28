'use strict';
const hkjc = require('./hkjc.js');
const url_beta = require('./url_beta.js');
const macauslot = require('./macauslot.js');
//用策略模式引用所有网页借口
const Strategies = function() {};
Strategies.prototype.add = function(betName, betFunc) {
  this[betName] = betFunc;
};

var bet = new Strategies();
//增加网页接口位置
bet.add('url_beta', hkjc_beta.run);
bet.add('hkjc', hkjc.run);
bet.add('macauslot', macauslot.run);
exports.run = async function(betName) {
  let ans = await bet[betName]();
  console.log(ans);
};
