/**
 * @license
 * Copyright tsq.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/tsq/ali-sms/LICENSE
 */


const crypto  = require("crypto");
const request = require("request");
const debug   = require('debug')('sms');
const uuid    = require("uuid").v1;

const domain  = 'http://dysmsapi.aliyuncs.com';

// https://help.aliyun.com/document_detail/54229.html?spm=5176.doc55359.6.576.yA9ZH7&parentId=44282
// it's very important that object should be sorted by key
const sortKey = (obj) => {
  const ordered = {};
  Object.keys(obj).sort().forEach(function(key) {
    ordered[key] = obj[key];
  });
  return ordered;
};

// found from python sdk
const standardString = (query) => {
  let str = encodeURIComponent(query);
  str.replace('+', '%20')
    .replace('*', '%2A')
    .replace('%7E', '~');
  return str;
};

// https://help.aliyun.com/document_detail/54229.html?spm=5176.doc55359.6.576.yA9ZH7&parentId=44282
// signature algorithm
const getSignature = (paramObj, accessKeySecret) => {
  let param = sortKey(paramObj);
  let signStr = [];
  for (let i in param) {
    signStr.push(`${encodeURIComponent(i)}=${encodeURIComponent(param[i])}`);
  }
  signStr = signStr.join('&');
  signStr = 'GET&%2F&' + standardString(signStr);
  const sign = crypto.createHmac("sha1", accessKeySecret + '&')
    .update(signStr)
    .digest('base64');
  return encodeURIComponent(sign);
};

module.exports = (config, cb) => {
  const errorMsg = [];
  if (!config.accessKeyID) {
    errorMsg.push('accessKeyID required');
  }
  if (!config.accessKeySecret) {
    errorMsg.push('accessKeySecret required');
  }
  if (!config.paramString) {
    errorMsg.push('paramString required');
  }
  if (!Array.isArray(config.recNum)) {
    errorMsg.push('recNum must be an array');
  }
  if (!config.signName) {
    errorMsg.push('signName required');
  }
  if (!config.templateCode) {
    errorMsg.push('templateCode required');
  }
  if (errorMsg.length) {
    return cb(errorMsg.join(','));
  }

  const param = {
    PhoneNumbers: config.recNum.join(','),
    TemplateParam: JSON.stringify(config.paramString),
    OutId: uuid(),
    Format: 'json',
    Timestamp: new Date().toISOString(),
    RegionId: 'cn-hangzhou',
    SignatureVersion: '1.0',
    AccessKeyId: config.accessKeyID,
    TemplateCode: config.templateCode,
    SignatureMethod: 'HMAC-SHA1',
    Version: '2017-05-25',
    SignName: config.signName,
    Action: 'SendSms',
    SignatureNonce: uuid()
  };
  const signature = getSignature(param, config.accessKeySecret);
  let reqBody = [`Signature=${signature}`];
  for (let i in param) {
    reqBody.push(`${i}=${encodeURIComponent(param[i])}`);
  }
  reqBody = reqBody.join('&');
  debug('signature: %s', signature);
  debug('request body: %s', reqBody);
  const requrl = `${domain}/?${reqBody}`;

  if (typeof cb === 'function') {
    request({
      uri: requrl,
      method: 'GET'
    }, (err, res, body) => cb(err, body));
  } else {
    return new Promise((resolve, reject) => {
      request({
        uri: requrl,
        method: 'GET'
      }, (err, res, body) => {
        if (err) {
          reject(err);
        } else {
          resolve(body);
        }
      });
    })
  }
};
