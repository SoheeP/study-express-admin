const axios = require('axios');
const moment = require('moment');
const lodash = require('lodash');
const util = require('util');
const svgCaptcha = require('svg-captcha');
const nodemailer = require('nodemailer');
const uuidv4 = require('uuid/v4');


exports.axios = axios;
exports.moment = moment;
exports._ = lodash;
exports.util = util;
exports.svgCaptcha = svgCaptcha;
exports.nodemailer = nodemailer;
exports.uuidv4 = uuidv4;