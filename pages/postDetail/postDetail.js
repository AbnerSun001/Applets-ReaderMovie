const postsData = require('../../data/posts-data.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const postId = options.postId;
    const postData = postsData.postContent[postId];
    this.setData({
      postData: postData,
      postId: postId
    })

    let postsCollected = wx.getStorageSync("postsCollected");
    if (postsCollected) {
      const postCollected = postsCollected[postId];
      this.setData({
        collected: postCollected
      })
    } else {
      let postsCollected = {};
      this.setData({
        collected: false
      })
      postsCollected[postId] = false;
      wx.setStorageSync('postsCollected', postsCollected)
    }
  },

  /**
   * 点击收藏按钮事件函数
   */
  onCollectionTap: function(event) {
    let that = this;
    let postsCollected = wx.getStorageSync("postsCollected");
    let postCollected = postsCollected[that.data.postId];
    this.setData({
      collected: !postCollected 
    })
    postsCollected[that.data.postId] = !postCollected
    wx.setStorageSync('postsCollected', postsCollected)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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