'use strict';
const {getLinks,getBet}=require("../crawelFrame");

const hkjcUrl = 'https://bet.hkjc.com/football/getJSON.aspx?jsontype=index.aspx';
const HkjcMill = function() {
  let betData = new Object();
  betData.homeTeam = this.homeTeam.teamNameEN;
  betData.awayTeam = this.awayTeam.teamNameEN;
  betData.H = this.hadodds.H.split('@')[1];
  betData.D = this.hadodds.D.split('@')[1];
  betData.A = this.hadodds.A.split('@')[1];
  return betData;
};
exports.run = async function() {
  let data = await getLinks(hkjcUrl);
  return getBet(JSON.parse(data), HkjcMill);
};

