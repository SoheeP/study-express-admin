var express = require('express');
var router = express.Router();
var {isLogged, isLoggedModal} = require('./middlewares');
var {Axios} = require('./common');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/**
 * ROUTER: Mypage
 */


router.route('/mypage')
.get(isLoggedModal,function(req, res, next){
  console.log(req.session);
  let userSeq = req.session.user.seq;
  // users/mypage/24
  let mypageConfig = {
    url: `/users/mypage?seq=${userSeq}`,
  };
  Axios(mypageConfig).then(function(response){
    let {data} = response;
    console.log(data);
    res.render('Pages/Mypage/mypage', {log: data.log})
  })
})


router.route('/profile')
.get(isLoggedModal,function(req, res, next){
  console.log(req.session);
  const body = {};
  body.pageName = 'profile';
  res.render('Pages/Profile/profile', body);
})
.post(isLoggedModal, function(req, res, next){
  let { email, seq:userSeq } = req.session.user;
  let { password } = req.body;
  let profileConfig = {
    url: '/users/profile/change/password',
    method: 'post',
    data: {
      email,
      password,
      userSeq
    }
  };
  Axios(profileConfig).then(({data})=>{
    if(data.result === 1){
      let modalConfig = {
        title: '비밀번호가 변경되었습니다',
        ahref: '/users/profile'
      }
      res.render('Common/Component/Modules/modal', modalConfig)
    } else {
      let modalConfig = {
        title: '오류가 발생하였습니다.',
        ahref: '/users/profile'
      }
      res.render('Common/Component/Modules/modal', modalConfig)
    }
  })

})


router.route('/history')
.get(function(req, res, next){

  // users/history

  res.render('Pages/Mypage/history');
})
module.exports = router;
