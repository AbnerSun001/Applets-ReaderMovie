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
    top250: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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

  dealDouBanData: function (data, type, status) {
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

  onMoreMovie: function(event) {
    const category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more-movie/moreMovie?category=' + category,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})