// pages/movies/movies.js
let app = getApp();
let utils = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: null,
    comingSoon: null,
    top250: null,
    showSearch: false,
    movies: []
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    const top250Url = app.globalData.g_doubanDomain + "/v2/movie/top250?start=0&count=3&" + app.globalData.g_doubanSuffix;
    const inTheatersUrl = app.globalData.g_doubanDomain + "/v2/movie/in_theaters?start=0&count=3&" + app.globalData.g_doubanSuffix;
    const comingSoonUrl = app.globalData.g_doubanDomain + "/v2/movie/coming_soon?start=0&count=3&" + app.globalData.g_doubanSuffix;
    this.getDouBanData(top250Url, 'top250', 'top250');
    this.getDouBanData(inTheatersUrl, 'inTheaters', '正在热映');
    this.getDouBanData(comingSoonUrl, 'comingSoon', '即将上映');
  },


  onMoreMovie: function(event) {
    const category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more-movie/moreMovie?category=' + category,
    })
  },

  onInput: function(e) {
    let inputValue = e.detail.value;

    this.setData({
      inputValue: inputValue
    })
  },

  onSearchTap: function(event) {
    let searchUrl = "https://movie.douban.com/j/subject_suggest?q=" + this.data.inputValue;
    const that = this;
    wx.request({
      url: searchUrl,
      method: 'GET',
      header: {
        'Content-Type': " "
      },
      success: function(res) {
        that.dealSearchData(res.data)
      }
    })
  },

  onCancelTap: function(event) {
    this.setData({
      showSearch: false,
      movies: []
    })
  },

  // 处理 搜索结果数据
  dealSearchData: function(data) {
    let movies = [];
    data.forEach(item => {
      let movie = {
        title: item.title,
        imageUrl: item.img,
        average: '9',
        movieId: item.id,
        stars: [1,1,1,1,1],
      };
      movies.push(movie);
    })
    this.setData({
      movies: this.data.movies.concat(movies),
      start: this.data.start + 20,
      showSearch: true
    })
  },

  // 获取豆瓣电影数据
  getDouBanData: function(url, type, status) {
    const that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'Content-Type': "application/xml"
      },
      success: function(res) {
        that.dealDouBanData(res.data.subjects, type, status);
      }
    })
  },

  // 处理获取豆瓣类型电源数据返回结果
  dealDouBanData: function(data, type, status) {
    let movies = [];
    let allTypeMovie = {};
    data.forEach(item => {
      let starsArr = utils.covertScore2Array(item.rating.stars);
      let movie = {
        title: item.title,
        imageUrl: item.images.large,
        average: item.rating.average,
        movieId: item.id,
        stars: starsArr,
        status: status
      };
      movies.push(movie);
    })
    allTypeMovie[type] = {
      movies: movies,
      status: status
    }
    this.setData({
      ...allTypeMovie
    })
  },

})