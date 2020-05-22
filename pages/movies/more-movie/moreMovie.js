// pages/movies/more-movie/moreMovie.js
let utils = require("../../../utils/util.js");
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     movies: [],
     dataUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const category = options.category;
    this.setData({
      category
    })
    let dataUrl;
    switch (category) {
      case '正在热映':
        dataUrl = app.globalData.g_doubanDomain + "/v2/movie/in_theaters?" + app.globalData.g_doubanSuffix;
        break;
      case '即将上映':
        dataUrl = app.globalData.g_doubanDomain + "/v2/movie/coming_soon?" + app.globalData.g_doubanSuffix;
        break;
      case 'top250':
        dataUrl = app.globalData.g_doubanDomain + "/v2/movie/top250?" + app.globalData.g_doubanSuffix;
        break;
      default:
        dataUrl = '';        
    }

    this.setData({
      category,
      dataUrl
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.category,
    })
    this.getDouBanData(this.data.dataUrl)
  },


  getDouBanData: function (dataUrl) {
    const that = this;
    wx.request({
      url: app.globalData.g_doubanDomain + "/v2/movie/in_theaters?" + app.globalData.g_doubanSuffix,
      method: 'GET',
      header: {
        'Content-Type': ""
      },
      success: function (res) {
        that.dealDouBanData(res.data.subjects);
      }
    })
  },

  dealDouBanData: function (data) {
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
      };
      movies.push(movie);
    })
    console.log(movies)
    this.data.movies = movies
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /** 
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})