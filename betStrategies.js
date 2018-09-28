const hkjc = require('./hkjc.js');
const hkjc1 = require('./hkjc1.js');
const macauslot = require('./macauslot.js');

const Strategies = function() {};
Strategies.prototype.add = function(betName, betFunc) {
  this[betName] = betFunc;
};

var bet = new Strategies();
bet.add('hkjc', hkjc1.run);
bet.add('macauslot', macauslot.run);
exports.run = async function(betName) {
  let ans = await bet[betName]();
  console.log(ans);
};
