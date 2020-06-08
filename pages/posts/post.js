// pages/posts/post.js
var postData = require('../../data/posts-data.js') 
Page({
  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.setData({
       postContent: postData.postContent
     })
  },

  onPostTap: function (event) {
    const postId = event.currentTarget.dataset.postId;
    wx.navigateTo({
      url: '../../pages/postDetail/postDetail?postId=' + postId,
    })
  },

  onSwiperTap: function(event) {
    const postId = event.target.dataset.postId;
    wx.navigateTo({
      url: '../../pages/postDetail/postDetail?postId=' + postId,
    })
  },

 
})