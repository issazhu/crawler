'use strict';
const charset = require('superagent-charset');
const request = require('superagent');
charset(request);
let hkjcUrl = 'https://bet.hkjc.com/football/getJSON.aspx?jsontype=index.aspx';
let getLinks = function(url) {
  return new Promise(function(resolve, reject) {
    request.get(url).charset('utf8').end((err, res) => {
      resolve(JSON.parse(res.text));
    });
  });
};
let jsonHkjcGet = data => {
  let ans = {};
  for (let i = 0; i < data.length; i++) {
    let obj = {
      homeTeam: data[i].homeTeam.teamNameEN,
      awayTeam: data[i].awayTeam.teamNameEN,
      H: data[i].hadodds.H.split('@')[1],
      D: data[i].hadodds.D.split('@')[1],
      A: data[i].hadodds.A.split('@')[1]
    };
    ans[i.toString()] = obj;
  }
  //console.log(ans);
  return ans;
};
exports.run = async function (){
  let data = await getLinks(hkjcUrl);
  return jsonHkjcGet(data);
};

