const express = require('express');
const router = express.Router();
const {
  Axios,
  createSvgCaptcha,
  replaceAll,
  varifivationMailForm
} = require('./common');
const {
  wrap
} = require('./middlewares');

const {
  nodemailer,
  uuidv4
} = require('./npm_modules');



/**
 * ROUTER: login
 */
router.route('/login')
  .get(wrap((req, res, next) => {
    res.render('Pages/Auth/login', {
      title: 'login'
    });
  }))
  .post(wrap((req, res, next) => {
    console.log(req.body.email);
    console.log(req.body.password);
    let email = req.body.email;
    let password = req.body.password;

    let loginConfig = {
      url: '/auth/login',
      data: {
        email: email,
        password: password
      },
      method: 'POST'
    };
    Axios(loginConfig).then( (response) => {
      let data = response.data;
      console.log(data);
      if (data.result === 1) {
        // 로그인 성공시

        req.session.user = data;
        console.log(req.session);
        res.redirect('/');
        //라우터주소
      } else if (data.result === 2) {
        //둘중 하나 틀렸을 때 
        res.redirect('/auth/login')

      } else {
        //둘다 틀렸을때

      }
    })

  }))

/**
 * ROUTER: logout
 */
router.route('/logout')
  .get(wrap((req, res, next) => {
    if (req.session) {
      console.log('로그아웃 처리');
      req.session.destroy(function (err) {
        if (err) {
          console.log('세션 삭제시 에러');
          return;
        }
        console.log('세션 삭제 성공');
        res.redirect('/')
      });
    } else {
      console.log('로긴 안되어 있음');
    }

  }))

/**
 * ROUTER: signup
 */
router.route('/signup')
  .get(wrap(async (req, res, next) => {




    let captcha = createSvgCaptcha();
    let body = {};
    body.captcha = captcha;
    req.session.captcha = captcha.text;
    res.render('Pages/Auth/signup', body);
  }))
  .post(wrap(async (req, res, next) => {
    let email = req.body.email;
    let emailVerification = req.body.emailVerification;
    let password = req.body.password;
    let username = req.body.username;
    let phone = req.body.phone;
    let verifyNumber = req.body.captcha;

    if (req.session.captcha === verifyNumber) {
      if(req.session.token === emailVerification){
        const signupConfig = {
          url: '/auth/signup',
          method: 'post',
          data: {
            email: email,
            verification: emailVerification,
            password: password,
            username: username,
            phone: phone,
          }
        };
        Axios(signupConfig, function (response) {
          let { data } = response;
          console.log(data);
          if (data.result === 1) {
            res.json({ result: 1 });
          } else if (data.result === 4) {
            res.json({ result: 4 });
          } else {
            res.json({ result: 2 });
          }
        })
      } else {
        res.json({result: 8})
      }
    } else {
      res.json({ result: 9 });
    }
  }))

/**
 * ROUTER: new create Captcha
 */
router.route('/captcha')
  .get(wrap(async (req, res, next) => {
    var captcha = createSvgCaptcha();
    let body = {};
    body.captcha = captcha;
    req.session.captcha = captcha.text;
    res.json(body)
  }))


  /**
   * ROUTER: Email verify
   */
router.route('/email/verify')
.get(wrap(async (req, res, next)=>{
  console.log(req.query);

  const { email } = req.query;
  // /email/check
  // email
  let checkEmailConfig = {
    url: '/auth/email/check',
    method: 'post',
    data: { email }
  }
  Axios(checkEmailConfig).then((response) => {
    let { data } = response;
    // email체크값이 있을때(= 1은 아이디가 있다)
    if(data.result !== 1){
      //아이디가 없을때
      res.json({ result: 1 })
    } else {
      //아이디가 있을때
      res.json({ result: 2 })
    }
  })

  // console.log(req);
  
}))
  .post(wrap(async (req, res, next) => {
    let body = {};
    let email = req.body.email;
    let token = uuidv4();
    let convertToken = replaceAll(token, "-", "")
    console.log(convertToken);
    req.session.token = convertToken;

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'contact.culturefree@gmail.com', // generated ethereal user
        pass: 'phantom05+' // generated ethereal password
      }
    });

    let info = await transporter.sendMail({
      service: 'gmail',
      from: '"Culture Free"', // sender address
      to: email, // list of receivers
      subject: 'Email verification ✔', // Subject line
      html: varifivationMailForm(convertToken) // html body
    }, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    res.json(body);
  }))


module.exports = router;


