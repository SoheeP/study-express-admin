let signupForm = s0.elm('#signupForm');
let email           = s0.elm("#email");
let verification    = s0.elm("#verification");
let password        = s0.elm("#password");
let passwordConfirm = s0.elm("#passwordConfirm");
let username        = s0.elm("#username");
let phone           = s0.elm("#phone");
let captchaRefreshBtn = s0.elm("#captchaRefreshBtn");
let captchaData = s0.elm("#captchaData");
let captchaValue = s0.elm("#captchaValue");
let emailVerifyBtn = s0.elm("#emailVerifyBtn");
let emailVerifyValue = s0.elm("#emailVerifyValue");


// click email verify
emailVerifyBtn.addEventListener('click', ()=>{
  let getEmailVerifyConfig = {
    url: '/auth/email/verify',
    method: 'get',
    params: {
      email: email.value
    }
  }
  axios(getEmailVerifyConfig).then((response)=>{
     let { data } = response;
     if(data.result === 1){
      sendVerifyNumber()
     } else {
       alert('이메일이 중복되었습니다.')
     }
  })

  function sendVerifyNumber(){
    $('.email__verify_value_input_box').slideDown(500);
    let emailVerifyConfig = {
      url: '/auth/email/verify',
      method: 'post',
      data: {
        email: email.value
      }
    }
    axios(emailVerifyConfig).then((response) => {
      console.log();
    })
  }


  
})

// submit form submit
signupForm.addEventListener('submit', function(e){
  e.preventDefault();
  console.log('submiiit');
  const signupConfig = {
    //라우터 주소 
    url: '/auth/signup',
    method: 'post',
    data: {
      email: email.value,
      password: password.value,
      username: username.value,
      phone: phone.value,
      emailVerification: emailVerifyValue.value,
      captcha: captchaValue.value,

    }
  };
  axios(signupConfig).then(function(response){
    let {data} = response;
    console.log(data);
    if(data.result === 9){
      alert('자동가입방지 문자를 확인해주세요.')
    } else {
      if(data.result === 8) {
        alert('이메일 인증문자를 확인해주세요');
      }else{

        if(data.result === 1){
          alert('회원가입을 축하합니다.')
          window.location.href = '/auth/login';
        } else if(data.result === 4){
          alert('이메일이 중복되었습니다.')
        } else {
          alert('입력하신 사항을 확인해주세요.')
        }
      }

    }
  })
})

// click captcha refresh button
captchaRefreshBtn.addEventListener('click', ()=>{
  const captchaConfig = {
    url: '/auth/captcha',
    method: 'get'
  }
  axios(captchaConfig).then((response) => {
    let { data } = response;
    captchaData.innerHTML = data.captcha.data    
  })
})

