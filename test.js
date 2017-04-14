const sms = require(".");
const assert = require("assert");
const accessKeyID     = process.env.ALI_SMS_ACCESSKEYID;
const accessKeySecret = process.env.ALI_SMS_ACCESSKEYSECRET;

const config = {
  accessKeyID       : accessKeyID,
  accessKeySecret   : accessKeySecret,
  paramString       : {code: '1234'},
  recNum            : ['17705143392'],
  signName          : "心血管生态",
  templateCode      : 'SMS_62010006'
};
sms(config, (err, body) => {
  assert.ok(!err);
  body = JSON.parse(body);
  assert.ok(body.hasOwnProperty('Model'));
});