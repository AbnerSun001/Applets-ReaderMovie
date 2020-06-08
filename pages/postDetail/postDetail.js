const postsData = require('../../data/posts-data.js')
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isPlaying: false,
    postId: 0
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
    
    if (app.globalData.g_currentMusicPostId === this.data.postId) {
      this.setData({
        isPlaying: app.globalData.g_isPlaying
      })
    }

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
    postsCollected[that.data.postId] = !postCollected;
    wx.setStorageSync('postsCollected', postsCollected);

    setTimeout(() => {
      wx.showToast({
        title: !postCollected ? '收藏成功' : "取消成功",
        icon: 'success'
      })
    }, 700)
  },

  /**
   * 分享按钮事件监听函数
   */
  onShareTap: function(event) {
    wx.showActionSheet({
      itemList: ['分享至QQ', '分享至微博', '分享至朋友圈'],
      success(res) {
        console.log(res.tapIndex)
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },

  /**
   * 音乐播放监听事件函数
   */
  onMusicTap: function(event) {
    let isPlaying = this.data.isPlaying;
    if (isPlaying) {
      this.InnerAudioContext.pause();
      this.setData({
        isPlaying: false
      })
      app.globalData.g_isPlaying = false;
      app.globalData.g_currentMusicPostId = null;
    } else {
      this.InnerAudioContext.play();
      this.setData({
        isPlaying: true
      })
      app.globalData.g_isPlaying = true;
      app.globalData.g_currentPostId === this.data.postId;
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    const currentPostId = this.data.postId;
    const postData = postsData.postContent[currentPostId];
    this.InnerAudioContext = app.globalData.g_innerAudioContext;
    this.InnerAudioContext.src = postData.musicSrc;
    this.InnerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },


})