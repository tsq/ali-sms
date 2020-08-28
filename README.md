# ali-sms
[![Build Status](https://travis-ci.org/tsq/ali-sms.svg?branch=master)](https://travis-ci.org/tsq/ali-sms)

Nodejs SDK for [Aliyun SMS service](https://www.aliyun.com/product/sms)

## Install

```
npm install ali-sms --save
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
// or:
// const body = await sms(config)
// console.log(body)
```

## Config 

param|type|description
----|----|--------------
accessKeyID | string | access key id, get from aliyun
accessKeySecret | string | access key secret, get from aliyun 
paramString | object | ali sms param which you have defined on aliyun sms dashboard
recNum | array | phone numbers of users
signName | string | ali sms param, get from aliyun sms dashboard
templateCode | string | ali sms param, get from aliyun sms dashboard

## Note
From 2017.06.22, Aliyun has [upgraded the sms service](https://help.aliyun.com/document_detail/55501.html). For a new sms user, Aliyun
forces you using the new sms service. So, your sms dashboard should be `https://dysms.console.aliyun.com/dysms.htm`. But for an old sms user,
you can still use the old sms service and your sms dashboard should be `https://mns.console.aliyun.com/#/home/cn-hangzhou`. If you are 
the old sms user. Please install version `1.0.2`

```
npm install ali-sms@1.0.2 --save
```

