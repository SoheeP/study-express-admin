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
.get(isLogged,function(req, res, next){
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

router.route('/history')
.get(function(req, res, next){

  // users/history

  res.render('Pages/Mypage/history');
})
module.exports = router;
