var dummy = require('./../dummy');
var {
  _,
  moment,
  axios,
  util,
  svgCaptcha
} = require('./npm_modules');

let resetColor = "\x1b[0m";
let clc = {
  bright: `\x1b[1m%s${resetColor}`,
  dim: `\x1b[2m%s${resetColor}`,
  underscore: `\x1b[4m%s${resetColor}`,
  blink: `\x1b[5m%s${resetColor}`,
  reverse: `\x1b[7m%s${resetColor}`,
  Hidden: `\x1b[8m%s${resetColor}`,
  black: `\x1b[30m%s${resetColor}`,
  red: `\x1b[31m%s${resetColor}`,
  green: `\x1b[32m%s${resetColor}`,
  yello: `\x1b[33m%s${resetColor}`,
  blue: `\x1b[34m%s${resetColor}`,
  magenta: `\x1b[35m%s${resetColor}`,
  cyan: `\x1b[36m%s${resetColor}`,
  white: `\x1b[37m%s${resetColor}`,
  bgBlack: `\x1b[40m%s${resetColor}`,
  bgRed: `\x1b[41m%s${resetColor}`,
  bgGreen: `\x1b[42m%s${resetColor}`,
  bgYellow: `\x1b[43m%s${resetColor}`,
  bgBlue: `\x1b[44m%s${resetColor}`,
  bgMagenta: `\x1b[45m%s${resetColor}`,
  bgCyan: `\x1b[46m%s${resetColor}`,
  bgWhite: `\x1b[47m%s${resetColor}`,
};

const commandLine = `==============================================================`;
/**
 * 
 * @param {*} txt 
 * @param {*} color 
 * @param {*} bool 
 */
function log(txt, color,bool = false) {
  if(!color){
    if(bool === true){
      console.log(util.inspect(txt, false, null, true ));
    }else{
      console.log(txt);
    }
  }else{
    color = color || 'bright'
    console.log(clc[color], txt);
  }
}




/**
 * 
 */
function log(text) {
  console.log(util.inspect(text, false, null, true));
}

function listAxios(config, callback) {
  axios(config)
    .then(function (response) {
      let data = response.data;

      if (data.status === 'ok') {
        callback(data)
        config.body.pageName = config.pageName;
        config.res.render('Pages/Category/list', config.body);
      }

    }).catch(function (error) {
      // handle error
      console.log(error);
    })
}

function Axios(config) {
  const apiAddress = 'http://localhost:8081';
  config.url = apiAddress + config.url;
  return axios(config)
}


function isLogged(obj,cb1,cb2){
  return (obj)?cb1() : cb2()
}


function replaceAll(str, searchStr, replaceStr) {
  return str.split(searchStr).join(replaceStr);
}


svgCaptcha.options.charPreset = '0123456789';
function createSvgCaptcha(){
  return svgCaptcha.create({
    size: 6,
    color: true,
    noise: 1,
    background: '#666'
  })
}
 

function varifivationMailForm(token){
  return `
  <div style="width: 300px;margin: auto;padding: 15px;">
  <h3 style="border-bottom: 1px solid #ececec;margin-top: 20px;padding-bottom: 10px;">Email Varifivation</h3>
  <h4>Token : <span style="font-size: 14px;font-weight: 500;color: #666;text-decoration: underline;">${token}</span></h4>
  <div style="font-size: 14px;">
    Please enter your token number into the registration site input.
  </div>
  </div>
  ` 
}

exports.dummy                = dummy;
exports.log                  = log;
exports.listAxios            = listAxios;
exports.Axios                = Axios;
exports.commandLine          = commandLine;
exports.isLogged             = isLogged;
exports.createSvgCaptcha     = createSvgCaptcha;
exports.replaceAll           = replaceAll;
exports.varifivationMailForm = varifivationMailForm;