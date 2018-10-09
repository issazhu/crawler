'use strict';
const { getLinks, getBet } = require('../crawelFrame');

var bet22Url =
  'https://22bet.com/LineFeed/Get1x2_VZip?sports=1&count=2000&lng=en&tz=8&mode=4&partner=151&getEmpty=true';

var configMill = function() {
  let betData = new Object();
  betData.id = this.attr('id');
  betData.homeTeam = this.attr('eh');
  betData.awayTeam = this.attr('ea');
  return betData;
};
var bet22Mill = function() {
  let betData = new Object();
  betData.homeTeam = this.O1;
  betData.awayTeam = this.O2;
  for (let key in this.E) {
    if (this.E[key].G === 1) {
      if (this.E[key].T === 1) {
        betData.H = this.E[key].C;
      } else if (this.E[key].T === 2) {
        betData.D = this.E[key].C;
      } else if (this.E[key].T === 3) {
        betData.A = this.E[key].C;
      }
    }
  }
  return betData;
};
exports.run = async function() {
  let data = await getLinks(bet22Url);
  data = JSON.parse(data);
  return getBet(data.Value, bet22Mill);
};
