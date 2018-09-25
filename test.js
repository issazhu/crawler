'use strict'
const charset = require('superagent-charset');
const request = require('superagent');
charset(request);
var testUrl = 'https://www.google.com.hk/';
var getLinks = (url) => {
    return new Promise(function (resolve, reject) {
        request
            .get(url)
            .charset('utf8')
            .end((err, res) => {
                resolve(res.text);
            });
    });
}
var show = (text) => {
    // var hkjcjson = JSON.parse(text);
    console.log(text);
}
getLinks(testUrl)
    .then((data) => {
        show(data);
    });
