'use strict'
const charset = require('superagent-charset');
const request = require('superagent');
charset(request);
var markSixUrl = 'https://bet.hkjc.com/marksix/getJSON.aspx?sd=20180101&ed=20180930&sb=0';
var getLinks = (url) => {
    return new Promise(function (resolve, reject) {
        request
            .get(url)
            .charset('utf8')
            .end((err, res) => {
                console.log(res.text);
            });
    });
}
var jsonMarkSix = (data) => {
    let ans = {};
    for (let i = 0; i < data.length; i++) {
        let obj = {
            id: data[i].id,
            date: data[i].date,
            no: data[i].no.split("+"),
            sno: data[i].sno,
        }
        ans[i.toString()] = obj;
    }
    //console.log(ans);
    return ans;
}
var show = (text) => {
    // var hkjcjson = JSON.parse(text);
    console.log(text);
}
getLinks(markSixUrl)
    .then((data) => {
        return jsonMarkSix(data);
    })
    .then((data) => {
        show(data);
    });
