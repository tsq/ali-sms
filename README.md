# ali-sms-sdk
[![build status][travis-image]][travis-url]
[travis-image]: https://travis-ci.org/tsq/ali-sms-sdk.svg?branch=master
[travis-url]: https://travis-ci.org/tsq/ali-sms-sdk


Nodejs SDK for Aliyun SMS service

## Install

```
npm install ali-sms-sdk
```

## Usage

```javascript
const sms = require("ali-sms-sdk");
const accessKeyID     = process.env.ALI_SMS_ACCESSKEYID;
const accessKeySecret = process.env.ALI_SMS_ACCESSKEYSECRET;

const config = {
  accessKeyID       : accessKeyID,
  accessKeySecret   : accessKeySecret,
  paramString       : {code: '123456'},
  recNum            : ['1891234567'],
  signName          : 'alibaba',
  templateCode      : 'SMS_28100008',
};
sms(config, (err, body) => {
  console.log(err, body);
});
```

## Config 

param|type|description
----|----|---|----
accessKeyID | string | access key id, get from aliyun
accessKeySecret | string | access key secret, get from aliyun 
paramString | object | ali sms param which you have defined in  aliyun sms dashboard
recNum | array | phone numbers of users
signName | string | ali sms param, get from aliyun sms dashboard
templateCode | string | ali sms param, get from aliyun sms dashboard

## Debug

```
DEBUG=sms npm start
```
