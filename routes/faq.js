var express = require('express');
var router = express.Router();
var { Axios } = require('./common');

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('Pages/Faq/faq', { pageName: 'FAQ' });
});

router.get('/list', function(req, res, next) {
  let body = {};
  let faqList = [];
  for(let i = 0; i < 4; i++){
    faqList.push({
      id: i,
      title: `title ${i+1}`,
      admin: `admin ${i}`
    })
  };
  body.pageName = 'FAQ List';
  body.faqList = faqList;
  res.render('Pages/Faq/faq_list', body);
});

/**
 * 
 */
router.route('/upload')
.post(function(req, res, next){
  console.log(req.body);
  let faqUploadConfig = {
    url: '/faq/upload',
    method: 'post',
    data: {
      title: req.body.faqUploadTitle,
      content: req.body.faqUploadContent,
      author: 'admin'
    }
  }

  Axios(faqUploadConfig, (response)=>{
    let { data } = response;
    if(data.result === 1){
      res.json({result: 1})
    } else {
      res.json({result: 2})
    }
  })
})

module.exports = router;
