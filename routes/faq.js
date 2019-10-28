var express = require('express');
var router = express.Router();
var { Axios } = require('./common');
var { wrap,isLoggedModal } = require('./middlewares');

/* GET home page. */


router.get('/list',isLoggedModal, function(req, res, next) {
  let body = {};
  body.pageName = 'FAQ List';
  let faqListConfig = {
    url: '/faq/list',
    method: 'get',
  }
  Axios(faqListConfig).then(({data})=>{
    if(data.result === 1){
      Object.assign(body, data)
      console.log(body);
      res.render('Pages/Faq/faq_list', body);
    } else {
      body.result = 2;
      res.render('Pages/Faq/faq_list', body);
    }
  });
});

/**
 * 
 * * http://localhost:8081/faq/upload
 * title, conten, author
 */
router.route('/upload')
.post(isLoggedModal,function(req, res, next){
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

  Axios(faqUploadConfig).then((response)=>{
    let { data } = response;
    if(data.result === 1){
      res.json({result: 1})
    } else {
      res.json({result: 2})
    }
  })
})



// ROUTER: faq detail
// post /faq/detail
// faqSeq
router.route('/detail/:mode/:id')
  .get(isLoggedModal,wrap(async (req, res, next) => {
    let body = {};
    let { id:faqSeq, mode } = req.params;
    body.pageName = 'FAQ List';
    body.mode = mode;
    let faqListConfig = {
      url: '/faq/detail',
      method: 'post',
      data: {
        faqSeq
      }
    }
    Axios(faqListConfig).then(({ data }) => {
      if (data.result === 1) {
        Object.assign(body, data)
        console.log(body,'body');
        res.render('Pages/Faq/faq_detail', body);
      } else {
        body.result = 2;
        const modalConfig = {
          title: `서버에 문제가 생겼습니다. 잠시후 다시 시도해주세요`,
          ahref: `/faq/list`
        }
        res.render('Common/Component/Modules/modal', modalConfig);
      }
    });
  }));
  
// /faq/delete
// faqSeq
router.route('/delete/:faqSeq')
.get(isLoggedModal,function(req, res, next){
  let { faqSeq } = req.params;
  let faqDeleteConfig = {
    url: '/faq/delete',
    method: 'post',
    data: {
      faqSeq
    }
  }
  Axios(faqDeleteConfig).then(({data})=>{
    if(data.result ===1){
      const modalConfig = {
        title: `삭제되었습니다.`,
        ahref: `/faq/list`
      }
      res.render('Common/Component/Modules/modal', modalConfig);
    }else{
      const modalConfig = {
        title: `서버에 문제가 생겼습니다. 잠시후 다시 시도해주세요`,
        ahref: `/faq/list`
      }
      res.render('Common/Component/Modules/modal', modalConfig);
    }
  })
})

//faqseq, title, content, author
router.route('/update')
.post(isLoggedModal,function(req, res, next){
  let { faqSeq, title, content } = req.body;
  let { username:author } = req.session.user;
  let faqUpdateConfig = {
    url: '/faq/update',
    method: 'post',
    data: {
      faqSeq,
      title,
      content,
      author,
    }
  }
  Axios(faqUpdateConfig).then(({data})=>{
    if(data.result ===1){
      const modalConfig = {
        title: `수정되었습니다.`,
        ahref: `/faq/list`
      }
      res.render('Common/Component/Modules/modal', modalConfig);
    }else{
      const modalConfig = {
        title: `서버에 문제가 생겼습니다. 잠시후 다시 시도해주세요`,
        ahref: `/faq/list`
      }
      res.render('Common/Component/Modules/modal', modalConfig);
    }
  })
})
module.exports = router;
