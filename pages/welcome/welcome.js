// pages/welcome/welcome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onTap: function () {
    wx.switchTab({
      url: '../posts/post',
    })    //  和跳转页面是父子关系，微信自动生成返回按钮
  },


})