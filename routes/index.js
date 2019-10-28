var express = require('express');
var {
  indexInfo
} = require('../dummy');
var router = express.Router();
var {
  dummy,
  log,
  listAxios,
  Axios
} = require('./common');
var {
  _,
  moment,
  axios
} = require('./npm_modules');
var {wrap,isLoggedModal} = require('./middlewares');




/* 인덱스페이지 */
router.get('/', isLoggedModal,wrap(async function (req, res, next) {
  console.log(req.session);
  let limit = 10;
  let body = {};
  let axiosLikeConfig = {
    method: 'get',
    url: `/movie?limit=${limit}&sort_by=like_count`,
  };

  let axiosDownloadConfig = {
    method: 'get',
    url: `/movie?limit=${limit}&sort_by=download_count`,
  };

  let axiosRatingConfig = {
    method: 'get',
    url: `/movie?limit=${limit}&sort_by=rating`,
  };

  let axiosMainSlideConfig = {
    method: 'get',
    url: `/movie?limit=5&sort_by=date_added`,
  };



  await axios.all([
      Axios(axiosLikeConfig),
      Axios(axiosDownloadConfig),
      Axios(axiosRatingConfig),
      Axios(axiosMainSlideConfig)
    ])
    .then(axios.spread(function (like, download, rating, main) {
      body.categoryData = [{
          category: '좋아요 순.',
          movies: like.data.data.movies
        },
        {
          category: "다운로드 순",
          movies: download.data.data.movies
        },
        {
          category: '평점 순.',
          movies: rating.data.data.movies
        }
      ];
      body.mainSlideData = main.data.data.movies
    }));
  body.pageName = 'Home',
    res.render('index', body);
}) );




module.exports = router;