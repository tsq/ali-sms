# ali-sms
[![build status][travis-image]][travis-url]
[travis-image]: https://travis-ci.org/tsq-old/ali-sms.svg?branch=master
[travis-url]: https://travis-ci.org/tsq-old/ali-sms


Nodejs SDK for [Aliyun SMS service](https://help.aliyun.com/product/44282.html)

## Install

```
npm install ali-sms
```

## Usage

```javascript
const sms = require("ali-sms");
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
paramString | object | ali sms param which you have defined on aliyun sms dashboard
recNum | array | phone numbers of users
signName | string | ali sms param, get from aliyun sms dashboard
templateCode | string | ali sms param, get from aliyun sms dashboard

## Debug

```
DEBUG=sms npm start
```
