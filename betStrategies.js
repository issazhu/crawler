'use strict';
const hkjc = require('./betClub/hkjc.js');
const url_beta = require('./betClub/url_beta.js');
const macauslot = require('./betClub/macauslot.js');
const bet22 = require('./betClub/bet22.js');

//用策略模式引用所有网页借口
const Strategies = function() {};
Strategies.prototype.add = function(betName, betFunc) {
  this[betName] = betFunc;
};
var bet = new Strategies();

exports.run = async function(betName) {
  let ans = await bet[betName]();
  console.log(ans);
};
//增加网页接口位置
bet.add('url_beta', url_beta.run);
bet.add('hkjc', hkjc.run);
bet.add('macauslot', macauslot.run);
bet.add('bet22', bet22.run);

