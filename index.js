const crypto  = require("crypto");
const request = require("request");
const debug   = require('debug')('sms');

const url             = 'http://sms.aliyuncs.com/';

module.exports = function (config, cb) {
  const nonce           = Date.now();
  const date            = new Date();
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
    AccessKeyId: config.accessKeyID,
    Action: 'SingleSendSms',
    Format: 'JSON',
    ParamString: JSON.stringify(config.paramString),
    RecNum: config.recNum.join(','),
    RegionId: 'cn-hangzhou',
    SignName: config.signName,
    SignatureMethod: 'HMAC-SHA1',
    SignatureNonce: nonce,
    SignatureVersion: '1.0',
    TemplateCode: config.templateCode,
    Timestamp: date.toISOString(),
    Version: '2016-09-27'
  };
  let signStr = [];
  for (let i in param) {
    signStr.push(`${encodeURIComponent(i)}=${encodeURIComponent(param[i])}`);
  }
  signStr = signStr.join('&');
  signStr = 'POST&%2F&' + encodeURIComponent(signStr);
  const sign = crypto.createHmac("sha1", config.accessKeySecret + '&')
    .update(signStr)
    .digest('base64');
  const signature = encodeURIComponent(sign);
  let reqBody = [`Signature=${signature}`];
  for (let i in param) {
    reqBody.push(`${i}=${param[i]}`);
  }
  reqBody = reqBody.join('&');
  debug('signature: %s', signature);
  debug('request body: %s', reqBody);
  request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    uri: url,
    body: reqBody,
    method: 'POST'
  }, function (err, res, body) {
    cb(err, body);
  })
};
