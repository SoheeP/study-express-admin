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
var {wrap} = require('./middlewares');




/* 인덱스페이지 */
router.get('/', wrap(async function (req, res, next) {
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


/**
 * ROUTE: 무비 리스트 페이지
 */
router.get('/:category/list/:page', function (req, res, next) {
  console.log(req.params);
  console.log(req.params.category);

  let body = {};
  let pageName = '',
    url;
  if (req.params.category === 'movie') {
    pageName = 'movie';
    url = 'https://yts.tl/api/v2/list_movies.json?limit=10';
  }
  if (req.params.category === 'concert') {
    pageName = 'concert';
    url = 'https://yts.tl/api/v2/list_movies.json?limit=2';

  }
  if (req.params.category === 'expo') {
    pageName = 'exhibition';
    url = 'https://yts.tl/api/v2/list_movies.json?limit=5';
  }

  let configObj = {
    method: 'get',
    url: url,
    body: body,
    res: res,
    pageName: pageName
  }
  listAxios(configObj, function (data) {
    log(data.data);
    body.movies = data.data.movies;
  });

});

/**
 * ROUTE: 디테일 페이지
 */
router.get('/:category/detail/:seq', async function (req, res, next) {
  console.log(req.params, `detail params`);
  let body = {};
  let movie_seq = req.params.seq;
  let pageName = 'movie_detail';
  let randomSortBy = ['title', 'year', 'rating', 'peers', 'seeds', 'download_count', 'like_count', 'date_added'];
  let randomSort = randomSortBy[Math.floor(Math.random() * randomSortBy.length)]
  let axiosDetailConfig = {
    method: 'get',
    url: `/movie/detail?movie_id=${movie_seq}`,
  };
  let axiosDetailSlideConfig = {
    method: 'get',
    url: `/movie?limit=20&sort_by=${randomSort}`,
  }



  let movieGrade = {
    G: '전체 관람가',
    PG: '부모님동반 가능',
    ['PG-13']: '13세 이하',
    R: '17세',
    ['NC-17']: '17세 이상'
  };

  await axios.all([Axios(axiosDetailConfig), Axios(axiosDetailSlideConfig)])
    .then(axios.spread(function (detail, slide) {
      let detailInfo = detail.data.data.movie;

      if (detailInfo.mpa_rating.length !== 0) {
        detailInfo.mpa_rating = movieGrade[detailInfo.mpa_rating];
      } else {
        detailInfo.mpa_rating = '전체 관람가'
      }

      body.movieDetail = detail.data.data.movie;
      body.detailSlide = slide.data.data.movies;
      body.pageName = pageName;
    }));



  res.render('Pages/Category/movie_detail', body);

});

module.exports = router;